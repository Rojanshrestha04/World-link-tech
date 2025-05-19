import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"

const recentApplications = [
  {
    id: "APP-1234",
    name: "Ramesh Sharma",
    course: "Computer Hardware & Networking",
    date: "2025-04-15",
    status: "pending",
  },
  {
    id: "APP-1235",
    name: "Sunita Gurung",
    course: "Web Development",
    date: "2025-04-14",
    status: "approved",
  },
  {
    id: "APP-1236",
    name: "Bikash Thapa",
    course: "Electrical House Wiring",
    date: "2025-04-14",
    status: "pending",
  },
  {
    id: "APP-1237",
    name: "Anita Rai",
    course: "Mobile Phone Repair",
    date: "2025-04-13",
    status: "rejected",
  },
  {
    id: "APP-1238",
    name: "Deepak Karki",
    course: "Professional Cooking",
    date: "2025-04-12",
    status: "pending",
  },
]

export default function RecentApplicationsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentApplications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.id}</TableCell>
            <TableCell>{application.name}</TableCell>
            <TableCell>{application.course}</TableCell>
            <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                variant={
                  application.status === "approved"
                    ? "success"
                    : application.status === "rejected"
                      ? "destructive"
                      : "outline"
                }
              >
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <EyeIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
