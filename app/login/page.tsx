"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const { t, language } = useLanguage()
  const { login } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const safeToast = (opts: { title: string; description?: string; variant?: string }) => {
      toast({
        ...opts,
        variant: opts.variant === "destructive" ? "destructive" : "default"
      })
    }

    try {
      await login({
        method: loginMethod,
        email: loginMethod === "email" ? formData.email : undefined,
        phone: loginMethod === "phone" ? formData.phone : undefined,
        password: formData.password,
      }, safeToast)
    } catch (error) {
      safeToast({
        title: t("auth.loginFailed"),
        description: t("auth.loginFailedDesc"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("app.name")}</span>
        </Link>
        <LanguageSwitcher />
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="mx-auto max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{t("auth.login")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === "en" ? "Welcome back! Please enter your details." : "مرحبًا بعودتك! الرجاء إدخال بياناتك."}
            </p>
          </div>

          <Tabs defaultValue="email" value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">{t("auth.email")}</TabsTrigger>
              <TabsTrigger value="phone">{t("auth.phone")}</TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <TabsContent value="email">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "en" ? "name@example.com" : "name@example.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                    required={loginMethod === "email"}
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("auth.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={language === "en" ? "+1 (555) 000-0000" : "+966 5xxxxxxxx"}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={loginMethod === "phone"}
                  />
                </div>
              </TabsContent>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline underline-offset-4">
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("auth.loggingIn") : t("auth.login")}
              </Button>
            </form>
          </Tabs>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.noAccount")}{" "}
              <Link href="/signup" className="text-primary underline underline-offset-4">
                {t("auth.signup")}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
