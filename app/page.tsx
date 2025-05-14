"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Car, Globe, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LandingPage() {
  const { t, language } = useLanguage()
  const router = useRouter()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("app.name")}</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
            {t("auth.login")}
          </Button>
          <Button size="sm" onClick={() => router.push("/signup")}>
            {t("auth.signup")}
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t("app.tagline")}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    {language === "en"
                      ? "Premium ride-hailing service with trusted drivers and real-time tracking."
                      : "خدمة توصيل متميزة مع سائقين موثوقين وتتبع في الوقت الحقيقي."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" onClick={() => router.push("/signup")}>
                    {t("auth.signup")}
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => router.push("/signup/driver")}>
                    {t("auth.signupAsDriver")}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=700&width=700"
                    alt="Deal app interface showing a map with a car icon"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {language === "en" ? "How It Works" : "كيف تعمل الخدمة"}
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {language === "en"
                    ? "Simple, fast, and reliable rides at your fingertips."
                    : "رحلات بسيطة وسريعة وموثوقة في متناول يدك."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Request a Ride" : "اطلب رحلة"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Enter your destination, choose your ride type, and request a driver."
                    : "أدخل وجهتك، واختر نوع الرحلة، واطلب سائقًا."}
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Track Your Driver" : "تتبع السائق"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Watch your driver arrive in real-time and communicate via in-app chat."
                    : "شاهد وصول السائق في الوقت الحقيقي وتواصل معه عبر الدردشة داخل التطبيق."}
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Enjoy Your Ride" : "استمتع برحلتك"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Arrive safely at your destination and rate your experience."
                    : "صل بأمان إلى وجهتك وقيّم تجربتك."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {language === "en" ? "Why Choose Deal" : "لماذا تختار ديل"}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Safety First" : "السلامة أولاً"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "All drivers are thoroughly vetted and background-checked for your peace of mind."
                    : "يتم التحقق من جميع السائقين وفحص خلفياتهم لراحة بالك."}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Quality Service" : "خدمة عالية الجودة"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Professional drivers, clean vehicles, and exceptional customer service."
                    : "سائقون محترفون، مركبات نظيفة، وخدمة عملاء استثنائية."}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{language === "en" ? "Available Everywhere" : "متوفر في كل مكان"}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Expanding coverage to ensure you can get a ride wherever you are."
                    : "توسيع التغطية لضمان حصولك على رحلة أينما كنت."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Deal. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            {language === "en" ? "Terms of Service" : "شروط الخدمة"}
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            {language === "en" ? "Privacy" : "الخصوصية"}
          </a>
        </nav>
      </footer>
    </div>
  )
}
