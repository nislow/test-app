"use client"

import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { Car, LogOut } from "lucide-react"

export default function HomePage() {
  const { user, logout } = useAuth()
  const { t, language } = useLanguage()

  return (
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{t("app.name")}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {language === "en" ? `Welcome, ${user?.name}` : `مرحباً، ${user?.name}`}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">{t("auth.logout")}</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm border dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">{t("home.scheduleRide")}</h2>
              <p className="text-gray-500 mb-4">
                {language === "en"
                  ? "Schedule a new ride for your child"
                  : "جدولة رحلة جديدة لطفلك"}
              </p>
              <Button className="w-full" onClick={() => window.location.href = "/schedule-ride"}>
                {t("home.scheduleNow")}
              </Button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">{t("home.activeRides")}</h2>
              <p className="text-gray-500 mb-4">
                {language === "en"
                  ? "View and track active rides"
                  : "عرض وتتبع الرحلات النشطة"}
              </p>
              <Button className="w-full" onClick={() => window.location.href = "/ride-in-progress"}>
                {t("home.viewRides")}
              </Button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">{t("home.rideHistory")}</h2>
              <p className="text-gray-500 mb-4">
                {language === "en"
                  ? "View your past rides and payments"
                  : "عرض رحلاتك السابقة والمدفوعات"}
              </p>
              <Button className="w-full" onClick={() => window.location.href = "/ride-history"}>
                {t("home.viewHistory")}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
