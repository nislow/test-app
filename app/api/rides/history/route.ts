import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import type { RideStatus } from "@/lib/generated/prisma"

const querySchema = z.object({
  status: z.enum(["SCHEDULED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

type WhereClause = {
  driverId?: string;
  parentId?: string;
  status?: RideStatus;
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const validatedQuery = querySchema.parse({
      status: searchParams.get("status"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    })

    const skip = (validatedQuery.page - 1) * validatedQuery.limit

    // Build where clause based on user role
    const where: WhereClause = user.role === "DRIVER"
      ? { driverId: user.id }
      : { parentId: user.id }

    // Add status filter if provided
    if (validatedQuery.status) {
      where.status = validatedQuery.status as RideStatus
    }

    // Get rides with pagination
    const [rides, total] = await Promise.all([
      prisma.ride.findMany({
        where,
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
          rating: true,
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take: validatedQuery.limit,
      }),
      prisma.ride.count({ where }),
    ])

    return NextResponse.json({
      rides,
      pagination: {
        total,
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        totalPages: Math.ceil(total / validatedQuery.limit),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error fetching ride history:", error)
    return NextResponse.json(
      { error: "Failed to fetch ride history" },
      { status: 500 }
    )
  }
} 