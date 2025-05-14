"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Common
    "app.name": "Deal",
    "app.tagline": "Your Ride, Your Way",
    language: "Language",
    english: "English",
    arabic: "Arabic",

    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.phone": "Phone Number",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.forgotPassword": "Forgot Password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.signupAsDriver": "Sign up as a Driver",
    "auth.signupAsUser": "Sign up as a User",
    "auth.driverLicense": "Driver's License Number",
    "auth.vehicleInfo": "Vehicle Information",
    "auth.vehicleMake": "Vehicle Make",
    "auth.vehicleModel": "Vehicle Model",
    "auth.vehiclePlate": "License Plate",
    "auth.uploadDocuments": "Upload Documents",
    "auth.uploadPhoto": "Upload Profile Photo",
    "auth.verifyPhone": "Verify Phone Number",
    "auth.enterOTP": "Enter the OTP sent to your phone",
    "auth.resendOTP": "Resend OTP",
    "auth.verify": "Verify",
    "auth.pendingApproval": "Your application is pending approval",

    // Home
    "home.whereToGo": "Where to?",
    "home.currentLocation": "Current Location",
    "home.setDestination": "Set Destination",
    "home.requestRide": "Request Ride",
    "home.nearbyDrivers": "Nearby Drivers",
    "home.estimatedFare": "Estimated Fare",
    "home.estimatedTime": "Estimated Time",

    // Ride
    "ride.findingDriver": "Finding you a driver...",
    "ride.driverFound": "Driver Found!",
    "ride.driverArriving": "Driver is arriving in",
    "ride.driverArrived": "Driver has arrived",
    "ride.inProgress": "Ride in Progress",
    "ride.completed": "Ride Completed",
    "ride.rateDriver": "Rate your driver",
    "ride.leaveComment": "Leave a comment",
    "ride.submit": "Submit",
    "ride.cancel": "Cancel Ride",
    "ride.contact": "Contact Driver",

    // Chat
    "chat.message": "Message",
    "chat.send": "Send",
    "chat.imHere": "I'm here",
    "chat.comingNow": "Coming now",
    "chat.waitingForYou": "Waiting for you",
    "chat.onMyWay": "On my way",

    // Driver
    "driver.online": "Go Online",
    "driver.offline": "Go Offline",
    "driver.newRequest": "New Ride Request",
    "driver.accept": "Accept",
    "driver.decline": "Decline",
    "driver.startRide": "Start Ride",
    "driver.endRide": "End Ride",
    "driver.earnings": "Earnings",
    "driver.todayEarnings": "Today's Earnings",
    "driver.totalEarnings": "Total Earnings",
    "driver.completedRides": "Completed Rides",

    // Profile
    "profile.title": "Profile",
    "profile.editProfile": "Edit Profile",
    "profile.rideHistory": "Ride History",
    "profile.payment": "Payment Methods",
    "profile.settings": "Settings",
    "profile.help": "Help & Support",
    "profile.logout": "Logout",

    // History
    "history.title": "Ride History",
    "history.noRides": "No rides yet",
    "history.date": "Date",
    "history.from": "From",
    "history.to": "To",
    "history.amount": "Amount",
    "history.status": "Status",

    // Settings
    "settings.title": "Settings",
    "settings.notifications": "Notifications",
    "settings.language": "Language",
    "settings.darkMode": "Dark Mode",
    "settings.privacy": "Privacy Policy",
    "settings.terms": "Terms of Service",
    "settings.about": "About Deal",

    // Buttons
    "button.continue": "Continue",
    "button.back": "Back",
    "button.save": "Save",
    "button.cancel": "Cancel",
    "button.done": "Done",
    "button.next": "Next",
  },
  ar: {
    // Common
    "app.name": "ديل",
    "app.tagline": "رحلتك، بطريقتك",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.phone": "رقم الهاتف",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.firstName": "الاسم الأول",
    "auth.lastName": "اسم العائلة",
    "auth.forgotPassword": "نسيت كلمة المرور؟",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.hasAccount": "لديك حساب بالفعل؟",
    "auth.signupAsDriver": "التسجيل كسائق",
    "auth.signupAsUser": "التسجيل كمستخدم",
    "auth.driverLicense": "رقم رخصة القيادة",
    "auth.vehicleInfo": "معلومات المركبة",
    "auth.vehicleMake": "نوع المركبة",
    "auth.vehicleModel": "موديل المركبة",
    "auth.vehiclePlate": "رقم اللوحة",
    "auth.uploadDocuments": "تحميل المستندات",
    "auth.uploadPhoto": "تحميل صورة الملف الشخصي",
    "auth.verifyPhone": "التحقق من رقم الهاتف",
    "auth.enterOTP": "أدخل رمز التحقق المرسل إلى هاتفك",
    "auth.resendOTP": "إعادة إرسال رمز التحقق",
    "auth.verify": "تحقق",
    "auth.pendingApproval": "طلبك قيد المراجعة",

    // Home
    "home.whereToGo": "إلى أين؟",
    "home.currentLocation": "الموقع الحالي",
    "home.setDestination": "تحديد الوجهة",
    "home.requestRide": "طلب رحلة",
    "home.nearbyDrivers": "السائقين القريبين",
    "home.estimatedFare": "التكلفة التقديرية",
    "home.estimatedTime": "الوقت التقديري",

    // Ride
    "ride.findingDriver": "جاري البحث عن سائق...",
    "ride.driverFound": "تم العثور على سائق!",
    "ride.driverArriving": "السائق سيصل خلال",
    "ride.driverArrived": "وصل السائق",
    "ride.inProgress": "الرحلة جارية",
    "ride.completed": "اكتملت الرحلة",
    "ride.rateDriver": "قيّم السائق",
    "ride.leaveComment": "اترك تعليقًا",
    "ride.submit": "إرسال",
    "ride.cancel": "إلغاء الرحلة",
    "ride.contact": "الاتصال بالسائق",

    // Chat
    "chat.message": "رسالة",
    "chat.send": "إرسال",
    "chat.imHere": "أنا هنا",
    "chat.comingNow": "قادم الآن",
    "chat.waitingForYou": "في انتظارك",
    "chat.onMyWay": "في الطريق",

    // Driver
    "driver.online": "متصل",
    "driver.offline": "غير متصل",
    "driver.newRequest": "طلب رحلة جديد",
    "driver.accept": "قبول",
    "driver.decline": "رفض",
    "driver.startRide": "بدء الرحلة",
    "driver.endRide": "إنهاء الرحلة",
    "driver.earnings": "الأرباح",
    "driver.todayEarnings": "أرباح اليوم",
    "driver.totalEarnings": "إجمالي الأرباح",
    "driver.completedRides": "الرحلات المكتملة",

    // Profile
    "profile.title": "الملف الشخصي",
    "profile.editProfile": "تعديل الملف الشخصي",
    "profile.rideHistory": "سجل الرحلات",
    "profile.payment": "طرق الدفع",
    "profile.settings": "الإعدادات",
    "profile.help": "المساعدة والدعم",
    "profile.logout": "تسجيل الخروج",

    // History
    "history.title": "سجل الرحلات",
    "history.noRides": "لا توجد رحلات بعد",
    "history.date": "التاريخ",
    "history.from": "من",
    "history.to": "إلى",
    "history.amount": "المبلغ",
    "history.status": "الحالة",

    // Settings
    "settings.title": "الإعدادات",
    "settings.notifications": "الإشعارات",
    "settings.language": "اللغة",
    "settings.darkMode": "الوضع الداكن",
    "settings.privacy": "سياسة الخصوصية",
    "settings.terms": "شروط الخدمة",
    "settings.about": "عن ديل",

    // Buttons
    "button.continue": "متابعة",
    "button.back": "رجوع",
    "button.save": "حفظ",
    "button.cancel": "إلغاء",
    "button.done": "تم",
    "button.next": "التالي",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }
  }, [language])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}
