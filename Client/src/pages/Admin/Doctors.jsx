import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MoreVertical } from "lucide-react";
import { format } from "date-fns";

export default function Doctors() {
  const [date, setDate] = useState();

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      status: "Active",
      patients: 156,
      experience: "12 years",
      contact: "sarah.johnson@hospital.com",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      status: "Active",
      patients: 142,
      experience: "8 years",
      contact: "michael.chen@hospital.com",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      status: "On Leave",
      patients: 138,
      experience: "15 years",
      contact: "emily.davis@hospital.com",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      status: "Active",
      patients: 134,
      experience: "10 years",
      contact: "james.wilson@hospital.com",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Dermatology",
      status: "Active",
      patients: 129,
      experience: "6 years",
      contact: "lisa.anderson@hospital.com",
      avatar: "/api/placeholder/40/40"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Doctors</h2>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="list" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
            List Doctors
          </TabsTrigger>
          <TabsTrigger value="add" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
            Add Doctor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">All Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Specialty</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Patients</TableHead>
                    <TableHead className="text-gray-300">Experience</TableHead>
                    <TableHead className="text-gray-300">Contact</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id} className="border-gray-800">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback className="bg-gray-700 text-white">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{doctor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{doctor.specialty}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={doctor.status === 'Active' ? 'default' : 'secondary'}
                          className={doctor.status === 'Active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}
                        >
                          {doctor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">{doctor.patients}</TableCell>
                      <TableCell className="text-gray-400">{doctor.experience}</TableCell>
                      <TableCell className="text-gray-400">{doctor.contact}</TableCell>
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
                              Edit Profile
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
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="space-y-4">
                <TabsList className="bg-gray-800 border-gray-700">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger value="professional" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Professional Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">First Name</label>
                      <Input 
                        placeholder="Enter first name" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Last Name</label>
                      <Input 
                        placeholder="Enter last name" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input 
                      type="email"
                      placeholder="Enter email address" 
                      className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Phone</label>
                      <Input 
                        placeholder="Enter phone number" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Gender</label>
                      <Select>
                        <SelectTrigger className="bg-transparent border-gray-700 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                          <SelectItem value="male" className="text-gray-300 hover:bg-gray-800">Male</SelectItem>
                          <SelectItem value="female" className="text-gray-300 hover:bg-gray-800">Female</SelectItem>
                          <SelectItem value="other" className="text-gray-300 hover:bg-gray-800">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent border-gray-700 text-white hover:bg-gray-800"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span className="text-gray-500">Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-gray-900 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Address</label>
                    <Input 
                      placeholder="Enter address" 
                      className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="professional" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Specialty</label>
                      <Select>
                        <SelectTrigger className="bg-transparent border-gray-700 text-white">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                          <SelectItem value="cardiology" className="text-gray-300 hover:bg-gray-800">Cardiology</SelectItem>
                          <SelectItem value="neurology" className="text-gray-300 hover:bg-gray-800">Neurology</SelectItem>
                          <SelectItem value="pediatrics" className="text-gray-300 hover:bg-gray-800">Pediatrics</SelectItem>
                          <SelectItem value="orthopedics" className="text-gray-300 hover:bg-gray-800">Orthopedics</SelectItem>
                          <SelectItem value="dermatology" className="text-gray-300 hover:bg-gray-800">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">License Number</label>
                      <Input 
                        placeholder="Enter license number" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Years of Experience</label>
                      <Input 
                        type="number"
                        placeholder="Enter years of experience" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Qualification</label>
                      <Input 
                        placeholder="Enter qualification" 
                        className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Department</label>
                    <Select>
                      <SelectTrigger className="bg-transparent border-gray-700 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="emergency" className="text-gray-300 hover:bg-gray-800">Emergency</SelectItem>
                        <SelectItem value="surgery" className="text-gray-300 hover:bg-gray-800">Surgery</SelectItem>
                        <SelectItem value="icu" className="text-gray-300 hover:bg-gray-800">ICU</SelectItem>
                        <SelectItem value="outpatient" className="text-gray-300 hover:bg-gray-800">Outpatient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Add Doctor
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}