import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const assignSchema = z.object({
  driverId: z.string(),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = assignSchema.parse(body)

    // Check if ride exists and is in SCHEDULED status
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
    })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      )
    }

    if (ride.status !== "SCHEDULED") {
      return NextResponse.json(
        { error: "Ride cannot be assigned" },
        { status: 400 }
      )
    }

    // Check if driver exists and is verified
    const driver = await prisma.user.findFirst({
      where: {
        id: validatedData.driverId,
        role: "DRIVER",
        driverProfile: {
          verified: true,
          active: true,
        },
      },
      include: {
        driverProfile: true,
      },
    })

    if (!driver) {
      return NextResponse.json(
        { error: "Invalid driver" },
        { status: 400 }
      )
    }

    // Assign driver to ride
    const updatedRide = await prisma.ride.update({
      where: { id: params.id },
      data: {
        driverId: driver.id,
        status: "ASSIGNED",
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

    // TODO: Send notifications to parent and driver

    return NextResponse.json({
      ride: updatedRide,
      message: "Driver assigned successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error assigning driver:", error)
    return NextResponse.json(
      { error: "Failed to assign driver" },
      { status: 500 }
    )
  }
} 