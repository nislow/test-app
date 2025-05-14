"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, HelpCircle, History, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function ProfilePage() {
  const { t, language } = useLanguage()
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    name: language === "en" ? "John Doe" : "محمد أحمد",
    email: "user@example.com",
    phone: "+1 (555) 000-0000",
  })

  const menuItems = [
    {
      icon: <User className="h-5 w-5" />,
      title: t("profile.editProfile"),
      path: "/profile/edit",
    },
    {
      icon: <History className="h-5 w-5" />,
      title: t("profile.rideHistory"),
      path: "/ride-history",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: t("profile.payment"),
      path: "/payment-methods",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: t("profile.settings"),
      path: "/settings",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: t("profile.help"),
      path: "/help",
    },
  ]

  const handleLogout = () => {
    // In a real app, we would log the user out here
    router.push("/")
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <header className="px-4 h-16 flex items-center border-b">
        <Button variant="ghost" size="icon" onClick={() => router.push("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="ml-4 text-xl font-bold">{t("profile.title")}</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="flex items-center p-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 mr-4"></div>
          <div>
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo.phone}</p>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-14"
              onClick={() => router.push(item.path)}
            >
              <div className="flex items-center w-full">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </div>
            </Button>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start h-14 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <div className="flex items-center w-full">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <LogOut className="h-5 w-5 text-red-500" />
              </div>
              <span>{t("profile.logout")}</span>
            </div>
          </Button>
        </div>
      </main>
    </div>
  )
}
