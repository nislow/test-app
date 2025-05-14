import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export async function POST(
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
    const validatedData = ratingSchema.parse(body)

    // Get the ride
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
      include: {
        rating: true,
      },
    })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      )
    }

    // Check if ride is completed
    if (ride.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Can only rate completed rides" },
        { status: 400 }
      )
    }

    // Check if user is the parent of this ride
    if (ride.parentId !== user.id) {
      return NextResponse.json(
        { error: "Only parents can rate rides" },
        { status: 401 }
      )
    }

    // Check if ride is already rated
    if (ride.rating) {
      return NextResponse.json(
        { error: "Ride is already rated" },
        { status: 400 }
      )
    }

    // Create rating
    const rating = await prisma.rating.create({
      data: {
        rating: validatedData.rating,
        comment: validatedData.comment,
        rideId: ride.id,
        userId: user.id,
      },
      include: {
        ride: {
          include: {
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
        },
      },
    })

    // TODO: Send notification to driver about new rating

    return NextResponse.json({
      rating,
      message: "Rating submitted successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error submitting rating:", error)
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    )
  }
} 