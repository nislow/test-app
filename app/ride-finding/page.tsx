"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Car, MessageSquare, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { MapComponent } from "@/components/map-component"

export default function RideFindingPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [status, setStatus] = useState<"finding" | "found" | "arriving" | "arrived">("finding")
  const [countdown, setCountdown] = useState(5)
  const [driverInfo, setDriverInfo] = useState({
    name: language === "en" ? "Ahmed Ali" : "أحمد علي",
    rating: 4.8,
    car: language === "en" ? "Toyota Camry" : "تويوتا كامري",
    plate: "ABC 123",
    eta: 3,
  })

  useEffect(() => {
    // Simulate finding a driver
    const findingTimer = setTimeout(() => {
      setStatus("found")
    }, 3000)

    return () => clearTimeout(findingTimer)
  }, [])

  useEffect(() => {
    if (status === "found") {
      // Simulate driver arriving
      const arrivingTimer = setTimeout(() => {
        setStatus("arriving")
      }, 2000)

      return () => clearTimeout(arrivingTimer)
    }
  }, [status])

  useEffect(() => {
    if (status === "arriving" && countdown > 0) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      if (countdown === 1) {
        setTimeout(() => {
          setStatus("arrived")
        }, 1000)
      }

      return () => clearTimeout(countdownTimer)
    }
  }, [status, countdown])

  const handleCancel = () => {
    router.push("/home")
  }

  const handleChat = () => {
    router.push("/chat")
  }

  const handleStartRide = () => {
    router.push("/ride-in-progress")
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <main className="flex-1 relative">
        <MapComponent />

        <div className="absolute top-4 left-4 z-10">
          <Button variant="outline" size="icon" className="bg-white dark:bg-gray-800" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg">
          {status === "finding" && (
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
                <h2 className="text-xl font-semibold text-center">{t("ride.findingDriver")}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  {language === "en"
                    ? "Please wait while we connect you with a driver"
                    : "يرجى الانتظار بينما نوصلك بسائق"}
                </p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleCancel}>
                {t("ride.cancel")}
              </Button>
            </div>
          )}

          {status === "found" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center">{t("ride.driverFound")}</h2>
              <div className="flex items-center p-4 border rounded-lg">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{driverInfo.name}</h3>
                    <div className="flex items-center ml-2">
                      <span className="text-sm">{driverInfo.rating}</span>
                      <svg className="h-4 w-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {driverInfo.car} • {driverInfo.plate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleCancel}>
                  {t("ride.cancel")}
                </Button>
                <Button className="flex-1" onClick={handleChat}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("ride.contact")}
                </Button>
              </div>
            </div>
          )}

          {status === "arriving" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-medium">{driverInfo.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {driverInfo.car} • {driverInfo.plate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleChat}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <h2 className="text-xl font-semibold text-center mb-2">{t("ride.driverArriving")}</h2>
                <div className="text-4xl font-bold text-primary">
                  {countdown} {language === "en" ? "min" : "دقيقة"}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleCancel}>
                {t("ride.cancel")}
              </Button>
            </div>
          )}

          {status === "arrived" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h3 className="font-medium">{driverInfo.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {driverInfo.car} • {driverInfo.plate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleChat}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-center">{t("ride.driverArrived")}</h2>
              </div>

              <Button className="w-full" onClick={handleStartRide}>
                {language === "en" ? "Start Ride" : "بدء الرحلة"}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
