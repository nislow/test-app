import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

// Validation schema for ride scheduling
const scheduleRideSchema = z.object({
  pickupLocation: z.string().min(1),
  dropoffLocation: z.string().min(1),
  date: z.string().or(z.date()),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  childName: z.string().min(1),
  notes: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = scheduleRideSchema.parse(body)

    // Get or create child
    let child = await prisma.child.findFirst({
      where: {
        name: validatedData.childName,
        parentId: user.id,
      },
    })

    if (!child) {
      child = await prisma.child.create({
        data: {
          name: validatedData.childName,
          parentId: user.id,
        },
      })
    }

    // Create ride
    const ride = await prisma.ride.create({
      data: {
        pickupLocation: validatedData.pickupLocation,
        dropoffLocation: validatedData.dropoffLocation,
        date: new Date(validatedData.date),
        time: validatedData.time,
        notes: validatedData.notes,
        childId: child.id,
        parentId: user.id,
        status: "SCHEDULED",
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
      },
    })

    return NextResponse.json(
      {
        ride,
        message: "Ride scheduled successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error scheduling ride:", error)
    return NextResponse.json(
      { error: "Failed to schedule ride" },
      { status: 500 }
    )
  }
} 