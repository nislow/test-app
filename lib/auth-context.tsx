"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email?: string
  phone?: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (
    data: { method: "email" | "phone"; email?: string; phone?: string; password: string },
    toast?: (opts: { title: string; description?: string; variant?: string }) => void
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // TODO: Implement session check
        // For now, we'll just check localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (
    data: { method: "email" | "phone"; email?: string; phone?: string; password: string },
    toast?: (opts: { title: string; description?: string; variant?: string }) => void
  ) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const { user, token } = await response.json()

      // Store user data and token
      // NOTE: For production, use HTTP-only cookies for security and SSR compatibility
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)

      setUser(user)
      if (toast) {
        toast({ title: "Login successful", variant: "default" })
      }
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      if (toast) {
        toast({ title: "Login failed", variant: "destructive" })
      }
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 