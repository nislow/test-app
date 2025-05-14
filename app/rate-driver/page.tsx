"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"

export default function RateDriverPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    // In a real app, we would submit the rating and comment here
    router.push("/home")
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{t("ride.rateDriver")}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {language === "en" ? "How was your experience with Ahmed?" : "كيف كانت تجربتك مع أحمد؟"}
            </p>
          </div>

          <div className="flex justify-center gap-2 py-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-10 w-10 rating-star ${star <= rating ? "text-yellow-400 selected" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("ride.leaveComment")}</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={language === "en" ? "Share your experience (optional)" : "شارك تجربتك (اختياري)"}
              rows={4}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={rating === 0}>
            {t("ride.submit")}
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => router.push("/home")}>
            {language === "en" ? "Skip" : "تخطي"}
          </Button>
        </div>
      </main>
    </div>
  )
}
