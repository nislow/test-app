"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car, Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

interface RideDetails {
  pickupLocation: string
  dropoffLocation: string
  date: Date | undefined
  time: string
  childName: string
  notes: string
}

export default function ScheduleRidePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [rideDetails, setRideDetails] = useState<RideDetails>({
    pickupLocation: "",
    dropoffLocation: "",
    date: undefined,
    time: "",
    childName: "",
    notes: "",
  })

  const handleInputChange = (field: keyof RideDetails, value: string | Date | undefined) => {
    setRideDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/rides/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rideDetails),
      })

      if (!response.ok) {
        throw new Error("Failed to schedule ride")
      }

      router.push("/ride-history")
    } catch (error) {
      console.error("Error scheduling ride:", error)
      // TODO: Show error toast
    }
  }

  return (
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{t("app.name")}</span>
          </div>
          <Button variant="ghost" onClick={() => router.back()}>
            {t("common.back")}
          </Button>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t("schedule.title")}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">{t("schedule.pickupLocation")}</Label>
                <Input
                  id="pickupLocation"
                  value={rideDetails.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                  placeholder={t("schedule.enterPickupLocation")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoffLocation">{t("schedule.dropoffLocation")}</Label>
                <Input
                  id="dropoffLocation"
                  value={rideDetails.dropoffLocation}
                  onChange={(e) => handleInputChange("dropoffLocation", e.target.value)}
                  placeholder={t("schedule.enterDropoffLocation")}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t("schedule.date")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !rideDetails.date && "text-muted-foreground"
                        }`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {rideDetails.date ? format(rideDetails.date, "PPP") : t("schedule.pickDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={rideDetails.date}
                        onSelect={(date) => handleInputChange("date", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">{t("schedule.time")}</Label>
                  <Input
                    id="time"
                    type="time"
                    value={rideDetails.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="childName">{t("schedule.childName")}</Label>
                <Input
                  id="childName"
                  value={rideDetails.childName}
                  onChange={(e) => handleInputChange("childName", e.target.value)}
                  placeholder={t("schedule.enterChildName")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("schedule.notes")}</Label>
                <Input
                  id="notes"
                  value={rideDetails.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder={t("schedule.enterNotes")}
                />
              </div>

              <Button type="submit" className="w-full">
                {t("schedule.scheduleRide")}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
