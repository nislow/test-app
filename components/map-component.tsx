"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Car } from "lucide-react"

export function MapComponent() {
  const { language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [nearbyDrivers, setNearbyDrivers] = useState([
    { id: 1, lat: 0.001, lng: 0.002 },
    { id: 2, lat: -0.002, lng: 0.001 },
    { id: 3, lat: 0.003, lng: -0.002 },
  ])

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full w-full bg-gray-100">
      {!isLoaded ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div ref={mapRef} className="h-full w-full bg-[#e5e3df] relative">
          {/* Simulated map with basic styling */}

          {/* Current location marker */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="location-marker"></div>
          </div>

          {/* Nearby drivers */}
          <div className="absolute left-[45%] top-[40%]">
            <div className="driver-marker">
              <Car className={`h-5 w-5 text-primary ${language === "ar" ? "rtl-flip" : ""}`} />
            </div>
          </div>
          <div className="absolute left-[55%] top-[45%]">
            <div className="driver-marker">
              <Car className={`h-5 w-5 text-primary ${language === "ar" ? "rtl-flip" : ""}`} />
            </div>
          </div>
          <div className="absolute left-[48%] top-[55%]">
            <div className="driver-marker">
              <Car className={`h-5 w-5 text-primary ${language === "ar" ? "rtl-flip" : ""}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
