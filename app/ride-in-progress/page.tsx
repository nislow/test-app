"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Car, MessageSquare, Phone, Star, MapPin, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { MapComponent } from "@/components/map-component"

export default function RideInProgressPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [status, setStatus] = useState<"in-progress" | "completed">("in-progress")
  const [progress, setProgress] = useState(0)
  const [eta, setEta] = useState(12)
  const [driverInfo, setDriverInfo] = useState({
    name: language === "en" ? "Ahmed Ali" : "أحمد علي",
    rating: 4.8,
    car: language === "en" ? "Toyota Camry" : "تويوتا كامري",
    plate: "ABC 123",
  })

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          setStatus("completed")
          return 100
        }
        return newProgress
      })

      if (eta > 0) {
        setEta((prev) => prev - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleChat = () => {
    router.push("/chat")
  }

  const handleRateAndFinish = () => {
    router.push("/rate-driver")
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <main className="flex-1 relative">
        <MapComponent />

        <div className="absolute inset-x-0 bottom-0 z-10 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg">
          {status === "in-progress" && (
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

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("ride.inProgress")}</span>
                  <span>{language === "en" ? `${eta} min remaining` : `${eta} دقيقة متبقية`}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Car className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">
                      {language === "en" ? "Current Location" : "الموقع الحالي"}
                    </span>
                  </div>
                </div>
                <div className="w-0.5 h-6 bg-gray-200 ml-4"></div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{language === "en" ? "Destination" : "الوجهة"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === "completed" && (
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-center">{t("ride.completed")}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  {language === "en" ? "You have arrived at your destination" : "لقد وصلت إلى وجهتك"}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{driverInfo.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm ml-1">{driverInfo.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$15.50</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "en" ? "Total fare" : "إجمالي الأجرة"}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleRateAndFinish}>
                {t("ride.rateDriver")}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
