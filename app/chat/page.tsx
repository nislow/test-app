"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"

interface Message {
  id: number
  text: string
  sender: "user" | "driver"
  timestamp: Date
}

export default function ChatPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === "en" ? "Hello, I'll be your driver today." : "مرحبًا، سأكون سائقك اليوم.",
      sender: "driver",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    { key: "chat.imHere", text: t("chat.imHere") },
    { key: "chat.comingNow", text: t("chat.comingNow") },
    { key: "chat.waitingForYou", text: t("chat.waitingForYou") },
    { key: "chat.onMyWay", text: t("chat.onMyWay") },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate driver response
      setTimeout(() => {
        const driverResponse: Message = {
          id: messages.length + 2,
          text: language === "en" ? "I'll be there in a few minutes." : "سأكون هناك في غضون دقائق قليلة.",
          sender: "driver",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, driverResponse])
      }, 2000)
    }
  }

  const handleQuickReply = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, newMessage])

    // Simulate driver response
    setTimeout(() => {
      const driverResponse: Message = {
        id: messages.length + 2,
        text: language === "en" ? "Got it, thanks for letting me know!" : "فهمت، شكرًا لإعلامي!",
        sender: "driver",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, driverResponse])
    }, 2000)
  }

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "font-[system-ui]" : ""}`}>
      <header className="px-4 h-16 flex items-center border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="ml-4">
          <h1 className="font-medium">{language === "en" ? "Ahmed Ali" : "أحمد علي"}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">{language === "en" ? "Driver" : "السائق"}</p>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender === "user" ? "sent" : "received"}`}>
              {msg.text}
              <div className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString(language === "en" ? "en-US" : "ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="p-2 border-t">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply.key}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleQuickReply(reply.text)}
            >
              {reply.text}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 p-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("chat.message")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
