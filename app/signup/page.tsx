"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SignupPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would register the user here
    router.push("/verify-phone")
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
            <h1 className="text-3xl font-bold">{t("auth.signup")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === "en" ? "Create an account to get started." : "أنشئ حسابًا للبدء."}
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <Input id="firstName" placeholder={language === "en" ? "John" : "محمد"} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input id="lastName" placeholder={language === "en" ? "Doe" : "أحمد"} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === "en" ? "name@example.com" : "name@example.com"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("auth.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={language === "en" ? "+1 (555) 000-0000" : "+966 5xxxxxxxx"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} required />
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {t("auth.signup")}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.hasAccount")}{" "}
              <Link href="/login" className="text-primary underline underline-offset-4">
                {t("auth.login")}
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === "en" ? "Want to drive with us?" : "تريد العمل معنا كسائق؟"}{" "}
              <Link href="/signup/driver" className="text-primary underline underline-offset-4">
                {t("auth.signupAsDriver")}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
