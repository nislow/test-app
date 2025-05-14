"use client"

import { useEffect, useRef, useState } from "react"
import { Car, Navigation } from "lucide-react"

export function RideMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[400px] w-full bg-gray-100">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div ref={mapRef} className="h-full w-full bg-[#e5e3df]">
            {/* Simulated map with basic styling */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[2px] bg-gray-400 relative">
                {/* School location */}
                <div className="absolute -left-2 -top-4 flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium mt-1">School</span>
                </div>

                {/* Home location */}
                <div className="absolute -right-2 -top-4 flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium mt-1">Home</span>
                </div>

                {/* Car position (30% of the way) */}
                <div className="absolute left-[30%] -top-4 flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-600 animate-pulse">
                    <Car className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Driver: Michael Johnson</p>
                <p className="text-xs text-muted-foreground">Toyota Camry • ABC-1234</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">ETA: 12 min</p>
                <p className="text-xs text-muted-foreground">3.2 miles away</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
