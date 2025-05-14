"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car, Calendar, Filter, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

interface Ride {
  id: string
  status: "scheduled" | "completed" | "cancelled"
  pickupLocation: string
  dropoffLocation: string
  date: string
  time: string
  childName: string
  driverName?: string
  cost?: number
}

export default function RideHistoryPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock data - replace with API call in production
  const mockRides: Ride[] = [
    {
      id: "1",
      status: "completed",
      pickupLocation: "123 Home St",
      dropoffLocation: "ABC School",
      date: "2024-03-20",
      time: "08:00",
      childName: "Emma Smith",
      driverName: "John Driver",
      cost: 15.00,
    },
    {
      id: "2",
      status: "scheduled",
      pickupLocation: "123 Home St",
      dropoffLocation: "ABC School",
      date: "2024-03-21",
      time: "08:00",
      childName: "Emma Smith",
    },
    // Add more mock rides as needed
  ]

  const filteredRides = mockRides.filter((ride) => {
    const matchesSearch = searchTerm === "" || 
      ride.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ride.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "scheduled":
        return "text-blue-600 bg-blue-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
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
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{t("history.title")}</h1>
              <Button onClick={() => router.push("/schedule-ride")}>
                {t("history.scheduleNew")}
              </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder={t("history.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("history.filterByStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("history.allRides")}</SelectItem>
                    <SelectItem value="scheduled">{t("history.scheduled")}</SelectItem>
                    <SelectItem value="completed">{t("history.completed")}</SelectItem>
                    <SelectItem value="cancelled">{t("history.cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("history.date")}</TableHead>
                    <TableHead>{t("history.child")}</TableHead>
                    <TableHead className="hidden md:table-cell">{t("history.pickup")}</TableHead>
                    <TableHead className="hidden md:table-cell">{t("history.dropoff")}</TableHead>
                    <TableHead>{t("history.status")}</TableHead>
                    <TableHead className="text-right">{t("history.cost")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRides.map((ride) => (
                    <TableRow
                      key={ride.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => router.push(`/ride-details/${ride.id}`)}
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{format(new Date(ride.date), "MMM d, yyyy")}</span>
                          <span className="text-sm text-gray-500">{ride.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{ride.childName}</TableCell>
                      <TableCell className="hidden md:table-cell">{ride.pickupLocation}</TableCell>
                      <TableCell className="hidden md:table-cell">{ride.dropoffLocation}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(ride.status)}`}>
                          {t(`history.${ride.status}`)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {ride.cost ? `$${ride.cost.toFixed(2)}` : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
