"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car, Eye, EyeOff, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function DriverSignupPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null)
  const [idDoc, setIdDoc] = useState<File | null>(null)

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would register the driver here
    router.push("/verify-phone")
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0])
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
            <h1 className="text-3xl font-bold">{t("auth.signupAsDriver")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === "en" ? "Join our team of professional drivers." : "انضم إلى فريق السائقين المحترفين لدينا."}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
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
                {t("button.next")}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driverLicense">{t("auth.driverLicense")}</Label>
                <Input id="driverLicense" placeholder={language === "en" ? "DL12345678" : "1234567890"} required />
              </div>

              <div className="space-y-2">
                <Label>{t("auth.vehicleInfo")}</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder={language === "en" ? "Make (Toyota)" : "النوع (تويوتا)"} required />
                  <Input placeholder={language === "en" ? "Model (Camry)" : "الموديل (كامري)"} required />
                </div>
                <Input className="mt-2" placeholder={language === "en" ? "License Plate" : "رقم اللوحة"} required />
              </div>

              <div className="space-y-2">
                <Label>{t("auth.uploadPhoto")}</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="profilePhoto"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setProfilePhoto)}
                  />
                  <Label htmlFor="profilePhoto" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {profilePhoto
                        ? profilePhoto.name
                        : language === "en"
                          ? "Click to upload profile photo"
                          : "انقر لتحميل صورة الملف الشخصي"}
                    </span>
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("auth.uploadDocuments")}</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="licenseDoc"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, setLicenseDoc)}
                    />
                    <Label htmlFor="licenseDoc" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">
                        {licenseDoc ? licenseDoc.name : language === "en" ? "Driver's License" : "رخصة القيادة"}
                      </span>
                    </Label>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="idDoc"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, setIdDoc)}
                    />
                    <Label htmlFor="idDoc" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">
                        {idDoc ? idDoc.name : language === "en" ? "ID Document" : "وثيقة الهوية"}
                      </span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  {t("button.back")}
                </Button>
                <Button type="submit" className="flex-1">
                  {t("button.continue")}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.hasAccount")}{" "}
              <Link href="/login" className="text-primary underline underline-offset-4">
                {t("auth.login")}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
