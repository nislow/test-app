import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { hashPassword, createToken } from "@/lib/auth"
import crypto from "crypto"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8),
  role: z.enum(["PARENT", "DRIVER"]).default("PARENT"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phone: validatedData.phone },
        ],
      },
    })

    if (existingUser) {
      console.log('User already exists:', existingUser.email || existingUser.phone);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
        verified: false,
        verificationToken,
      },
    })
    console.log('User created:', user.email || user.phone);
    console.log('Verification link:', `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/verify?token=${verificationToken}`)

    // Create JWT token
    const token = await createToken(user.id)

    // Return user data (excluding sensitive information)
    const { password: _, ...userData } = user

    return NextResponse.json(
      {
        user: userData,
        token,
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

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    )
  }
} 