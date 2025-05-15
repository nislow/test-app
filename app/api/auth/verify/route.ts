import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }
  const user = await prisma.user.findFirst({ where: { verificationToken: token } })
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 })
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, verificationToken: null }
  })
  return NextResponse.json({ message: "Email verified!" })
} 