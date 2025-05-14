import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import type { RideStatus } from "@/lib/generated/prisma"

const updateStatusSchema = z.object({
  status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"]),
})

type AllowedTransitions = {
  [K in RideStatus]?: Array<RideStatus>
}

const allowedTransitions: AllowedTransitions = {
  ASSIGNED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  SCHEDULED: ["CANCELLED"],
} as const

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateStatusSchema.parse(body)

    // Get the ride
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
      include: {
        driver: true,
      },
    })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      )
    }

    // Check permissions
    const isParent = ride.parentId === user.id
    const isDriver = ride.driverId === user.id
    const isAdmin = user.role === "ADMIN"

    if (!isParent && !isDriver && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if status transition is allowed
    const allowedStatuses = allowedTransitions[ride.status as keyof typeof allowedTransitions] || []
    if (!allowedStatuses.includes(validatedData.status)) {
      return NextResponse.json(
        { error: "Invalid status transition" },
        { status: 400 }
      )
    }

    // Additional permission checks based on role and status
    if (validatedData.status === "IN_PROGRESS" && !isDriver && !isAdmin) {
      return NextResponse.json(
        { error: "Only drivers can start rides" },
        { status: 401 }
      )
    }

    if (validatedData.status === "COMPLETED" && !isDriver && !isAdmin) {
      return NextResponse.json(
        { error: "Only drivers can complete rides" },
        { status: 401 }
      )
    }

    // Update ride status
    const updatedRide = await prisma.ride.update({
      where: { id: params.id },
      data: {
        status: validatedData.status,
      },
      include: {
        child: true,
        parent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            driverProfile: true,
          },
        },
      },
    })

    // TODO: Send notifications to relevant parties

    return NextResponse.json({
      ride: updatedRide,
      message: "Ride status updated successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating ride status:", error)
    return NextResponse.json(
      { error: "Failed to update ride status" },
      { status: 500 }
    )
  }
} 