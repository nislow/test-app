"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function VerifyPhonePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResendOtp = () => {
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""])
    // Reset countdown
    setCountdown(30)
    setCanResend(false)
    // Focus the first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
    // In a real app, we would call the API to resend OTP here
  }

  const handleVerify = () => {
    // In a real app, we would verify the OTP here
    router.push("/home")
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
            <h1 className="text-3xl font-bold">{t("auth.verifyPhone")}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t("auth.enterOTP")}</p>
          </div>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <div className="text-center">
            {canResend ? (
              <Button variant="link" onClick={handleResendOtp} className="text-primary">
                {t("auth.resendOTP")}
              </Button>
            ) : (
              <p className="text-sm text-gray-500">
                {language === "en"
                  ? `Resend code in ${countdown} seconds`
                  : `إعادة إرسال الرمز خلال ${countdown} ثانية`}
              </p>
            )}
          </div>

          <Button onClick={handleVerify} className="w-full" disabled={otp.some((digit) => !digit)}>
            {t("auth.verify")}
          </Button>
        </div>
      </main>
    </div>
  )
}
