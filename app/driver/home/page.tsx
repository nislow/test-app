"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Car, DollarSign, Menu, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/components/language-provider"
import { MapComponent } from "@/components/map-component"

export default function DriverHomePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(false)
  const [showRideRequest, setShowRideRequest] = useState(false)
  const [countdown, setCountdown] = useState(15)
  
  useEffect(() => {
    // Simulate ride request after going online
    let requestTimer: NodeJS.Timeout
    
    if (isOnline) {
      requestTimer = setTimeout(() => {
        setShowRideRequest(true)
      }, 3000)
    }
    
    return () => clearTimeout(requestTimer)
  }, [isOnline])
  
  useEffect(() => {
    // Countdown for ride request
    let countdownTimer: NodeJS.Timeout
    
    if (showRideRequest && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      
      if (countdown === 0) {
        setShowRideRequest(false)
      }
    }
    
    return () => clearInterval(countdownTimer)
  }, [showRideRequest, countdown])
  
  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    if (!isOnline) {
      // Reset countdown when going online
      setCountdown(15)
    } else {
      // Hide ride request when going offline
      setShowRideRequest(false)
    }
  }
  
  const handleAcceptRide = () => {
    setShowRideRequest(false)
    router.push("/driver/ride-accepted")
  }
  
  const handleDeclineRide = () => {
    setShowRideRequest(false)
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <header className="px-4 h-16 flex items-center justify-between border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={language === "ar" ? "right" : "left"}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">{t("app.name")}</span>
              </div>
              
              <nav className="space-y-4 flex-1">
                <Link href="/driver/home" className="flex items-center gap-2 text-primary font-medium">
                  <Car className="h-5 w-5" />
                  <span>{language === "en" ? "Drive" : "القيادة"}</span>
                </Link>
                <Link href="/driver/earnings" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <DollarSign className="h-5 w-5" />
                  <span>{t("driver.earnings")}</span>
                </Link>
                <Link href="/driver/profile" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <User className="h-5 w-5" />
                  <span>{t("profile.title")}</span>
                </Link>
                <Link href="/driver/settings" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Settings className="h-5 w-5" />
                  <span>{t("profile.settings")}</span>
                </Link>
              </nav>
              
              <div className="pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("app.name")}</span>
        </div>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </header>
      
      <main className="flex-1 relative">
        <MapComponent />
        
        <div className="absolute inset-x-0 top-4 px-4 z-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isOnline 
                  ? (language === "en" ? "You're online" : "أنت متصل") 
                  : (language === "en" ? "You're offline" : "أنت غير متصل")}
              </p>
              <h2 className="font-medium">
                {language === "en" ? "Ready to drive?" : "مستعد للقيادة؟"}
              </h2>
            </div>
            <Switch 
              checked={isOnline} 
              onCheckedChange={handleToggleOnline
