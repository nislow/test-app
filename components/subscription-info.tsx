import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Current Plan: Standard</h3>
            <p className="text-sm text-muted-foreground">Billing cycle: Monthly</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium">$199/month</p>
            <p className="text-sm text-muted-foreground">Next billing: June 15, 2025</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            <span className="font-medium">12 rides remaining</span> this month (out of 20)
          </p>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-emerald-600" style={{ width: "40%" }}></div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium">Available Plans</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $99<span className="text-sm font-normal">/month</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Up to 8 rides per month</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Real-time tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Ride notifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Downgrade
            </Button>
          </CardFooter>
        </Card>
        <Card className="border-2 border-emerald-600">
          <CardHeader>
            <CardTitle>Standard</CardTitle>
            <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              Current Plan
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $199<span className="text-sm font-normal">/month</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Up to 20 rides per month</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Real-time tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Ride notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Schedule recurring pickups</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full bg-emerald-600">
              Current Plan
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $299<span className="text-sm font-normal">/month</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Unlimited rides</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Multiple children support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Priority scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Dedicated customer support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Upgrade</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
