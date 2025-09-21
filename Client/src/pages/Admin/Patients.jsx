import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus } from "lucide-react";

export default function Patients() {
  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      status: "Active",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      doctor: "Dr. Sarah Johnson",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Emily Johnson",
      age: 32,
      gender: "Female",
      status: "Discharged",
      lastVisit: "2024-01-10",
      condition: "Migraine",
      doctor: "Dr. Michael Chen",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Robert Davis",
      age: 67,
      gender: "Male",
      status: "Critical",
      lastVisit: "2024-01-20",
      condition: "Heart Disease",
      doctor: "Dr. Sarah Johnson",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Maria Garcia",
      age: 28,
      gender: "Female",
      status: "Active",
      lastVisit: "2024-01-18",
      condition: "Diabetes",
      doctor: "Dr. Emily Davis",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "David Wilson",
      age: 55,
      gender: "Male",
      status: "Active",
      lastVisit: "2024-01-12",
      condition: "Arthritis",
      doctor: "Dr. James Wilson",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Lisa Brown",
      age: 38,
      gender: "Female",
      status: "Admitted",
      lastVisit: "2024-01-22",
      condition: "Pneumonia",
      doctor: "Dr. Michael Chen",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-600 text-white',
      'Discharged': 'bg-blue-600 text-white',
      'Critical': 'bg-red-600 text-white',
      'Admitted': 'bg-yellow-600 text-white'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-600 text-white'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Patients List</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">All Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Age/Gender</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Last Visit</TableHead>
                <TableHead className="text-gray-300">Condition</TableHead>
                <TableHead className="text-gray-300">Doctor</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="border-gray-800">
                  <TableCell className="text-white">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {patient.age} / {patient.gender}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(patient.status)}
                  </TableCell>
                  <TableCell className="text-gray-400">{patient.lastVisit}</TableCell>
                  <TableCell className="text-gray-400">{patient.condition}</TableCell>
                  <TableCell className="text-gray-400">{patient.doctor}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                          View Medical History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                          View Prescription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}