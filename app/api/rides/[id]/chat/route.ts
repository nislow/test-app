import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

const messageSchema = z.object({
  content: z.string().min(1),
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
    const validatedData = messageSchema.parse(body)

    // Get the ride
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
      include: {
        chat: true,
      },
    })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      )
    }

    // Check if user is involved in the ride
    const isParent = ride.parentId === user.id
    const isDriver = ride.driverId === user.id
    const isAdmin = user.role === "ADMIN"

    if (!isParent && !isDriver && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get or create chat
    let chat = ride.chat
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          rideId: ride.id,
          userId: user.id,
        },
      })
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content: validatedData.content,
        chatId: chat.id,
      },
      include: {
        chat: {
          include: {
            ride: {
              include: {
                parent: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                driver: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    // TODO: Send real-time notification to other party

    return NextResponse.json({
      message,
      chatId: chat.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error sending message:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}

export async function GET(
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

    // Get the ride
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
      include: {
        chat: {
          include: {
            messages: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      )
    }

    // Check if user is involved in the ride
    const isParent = ride.parentId === user.id
    const isDriver = ride.driverId === user.id
    const isAdmin = user.role === "ADMIN"

    if (!isParent && !isDriver && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      chat: ride.chat,
    })
  } catch (error) {
    console.error("Error fetching chat:", error)
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    )
  }
} 