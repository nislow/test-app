import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createToken, verifyPassword } from "@/lib/auth"

// Validation schema for login request
const loginSchema = z.object({
  method: z.enum(["email", "phone"]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    console.log('Login API called');
    const body = await request.json()
    console.log('Request body:', body);
    const validatedData = loginSchema.parse(body)
    console.log('Validated data:', validatedData);

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phone: validatedData.phone },
        ],
      },
    })
    console.log('User found:', user);

    if (!user) {
      console.log('No user found for credentials');
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(validatedData.password, user.password)
    console.log('Password valid:', isValid);
    if (!isValid) {
      console.log('Password invalid');
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken(user.id)
    console.log('Token created:', token);

    // Return user data (excluding sensitive information)
    const { password: _, ...userData } = user

    console.log('Login successful, returning user data');
    return NextResponse.json(
      {
        user: userData,
        token,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Zod validation error:', error.errors);
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
} 