import { Pencil, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ChildrenProfiles() {
  const children = [
    {
      id: 1,
      name: "Emma Davis",
      age: 10,
      school: "Lincoln Elementary School",
      grade: "5th Grade",
      emergencyContact: "John Davis (Father)",
      medicalInfo: "No allergies",
    },
    {
      id: 2,
      name: "Jack Davis",
      age: 12,
      school: "Washington Middle School",
      grade: "7th Grade",
      emergencyContact: "John Davis (Father)",
      medicalInfo: "Peanut allergy",
    },
  ]

  return (
    <div className="space-y-4">
      {children.map((child) => (
        <div key={child.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{child.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {child.age} years old • {child.grade}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-muted-foreground">School:</div>
              <div>{child.school}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-muted-foreground">Emergency Contact:</div>
              <div>{child.emergencyContact}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-muted-foreground">Medical Information:</div>
              <div>{child.medicalInfo}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
