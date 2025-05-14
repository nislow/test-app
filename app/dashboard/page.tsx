"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  Car,
  Clock,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  Shield,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RideMap } from "@/components/ride-map"
import { RideHistory } from "@/components/ride-history"
import { ChildrenProfiles } from "@/components/children-profiles"
import { SubscriptionInfo } from "@/components/subscription-info"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setActiveTab("home")}
              >
                <Shield className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">SchoolRide</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-2 ${activeTab === "home" ? "text-emerald-600" : ""}`}
                onClick={() => setActiveTab("home")}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-2 ${activeTab === "rides" ? "text-emerald-600" : ""}`}
                onClick={() => setActiveTab("rides")}
              >
                <Car className="h-5 w-5" />
                Rides
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-2 ${activeTab === "children" ? "text-emerald-600" : ""}`}
                onClick={() => setActiveTab("children")}
              >
                <User className="h-5 w-5" />
                Children
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-2 ${activeTab === "subscription" ? "text-emerald-600" : ""}`}
                onClick={() => setActiveTab("subscription")}
              >
                <CreditCard className="h-5 w-5" />
                Subscription
              </Link>
              <Link href="#" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Log out
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setActiveTab("home")}>
          <Shield className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">SchoolRide</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link
            href="#"
            className={`flex items-center gap-2 ${activeTab === "home" ? "text-emerald-600" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 ${activeTab === "rides" ? "text-emerald-600" : ""}`}
            onClick={() => setActiveTab("rides")}
          >
            <Car className="h-4 w-4" />
            Rides
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 ${activeTab === "children" ? "text-emerald-600" : ""}`}
            onClick={() => setActiveTab("children")}
          >
            <User className="h-4 w-4" />
            Children
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 ${activeTab === "subscription" ? "text-emerald-600" : ""}`}
            onClick={() => setActiveTab("subscription")}
          >
            <CreditCard className="h-4 w-4" />
            Subscription
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-medium text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Avatar"
              className="rounded-full"
              height={32}
              width={32}
            />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Tabs defaultValue="home" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="rides">Rides</TabsTrigger>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="home" className="p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscription</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Standard</div>
                  <p className="text-xs text-muted-foreground">12 rides remaining this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Scheduled Ride</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Today</div>
                  <p className="text-xs text-muted-foreground">3:15 PM - School pickup</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Children</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Active profiles</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Rides</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">In the last 7 days</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Current Ride</CardTitle>
                  <CardDescription>Track your child's ride in real-time</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <RideMap />
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Emma Davis</p>
                    <p className="text-xs text-muted-foreground">Estimated arrival: 3:45 PM</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Contact Driver
                  </Button>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Rides</CardTitle>
                  <CardDescription>Your scheduled pickups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Tomorrow, 3:15 PM</p>
                        <p className="text-xs text-muted-foreground">Emma - School to Home</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Tomorrow, 4:30 PM</p>
                        <p className="text-xs text-muted-foreground">Jack - Soccer Practice to Home</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Friday, 3:15 PM</p>
                        <p className="text-xs text-muted-foreground">Emma - School to Home</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4" />
                    Schedule New Ride
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="rides" className="p-4 md:p-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ride History</CardTitle>
                  <CardDescription>View all your past rides</CardDescription>
                </CardHeader>
                <CardContent>
                  <RideHistory />
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4" />
                    Schedule New Ride
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="children" className="p-4 md:p-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Children Profiles</CardTitle>
                  <CardDescription>Manage your children's information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChildrenProfiles />
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4" />
                    Add Child
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="subscription" className="p-4 md:p-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <SubscriptionInfo />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Upgrade Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
