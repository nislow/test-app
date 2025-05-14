import { Calendar, Clock, MapPin } from "lucide-react"

export function RideHistory() {
  const rides = [
    {
      id: 1,
      date: "Today",
      time: "3:15 PM",
      child: "Emma Davis",
      from: "Lincoln Elementary School",
      to: "Home",
      driver: "Michael Johnson",
      status: "Completed",
    },
    {
      id: 2,
      date: "Yesterday",
      time: "4:30 PM",
      child: "Jack Davis",
      from: "Soccer Practice",
      to: "Home",
      driver: "Sarah Williams",
      status: "Completed",
    },
    {
      id: 3,
      date: "Yesterday",
      time: "3:15 PM",
      child: "Emma Davis",
      from: "Lincoln Elementary School",
      to: "Home",
      driver: "Michael Johnson",
      status: "Completed",
    },
    {
      id: 4,
      date: "Monday, May 10",
      time: "3:15 PM",
      child: "Emma Davis",
      from: "Lincoln Elementary School",
      to: "Home",
      driver: "Michael Johnson",
      status: "Completed",
    },
    {
      id: 5,
      date: "Monday, May 10",
      time: "4:30 PM",
      child: "Jack Davis",
      from: "Basketball Practice",
      to: "Home",
      driver: "Sarah Williams",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <div key={ride.id} className="flex flex-col space-y-2 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{ride.date}</span>
              <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{ride.time}</span>
            </div>
            <div className="text-sm font-medium">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  ride.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {ride.status}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{ride.child}</span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{ride.from}</span>
                  <span className="mx-2">→</span>
                  <span>{ride.to}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Driver: {ride.driver}</div>
        </div>
      ))}
    </div>
  )
}
