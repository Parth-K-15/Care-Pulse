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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, MoreVertical, Search } from "lucide-react";
import { format } from "date-fns";

export default function Appointments() {
  const [date, setDate] = useState();
  const [appointmentStatus, setAppointmentStatus] = useState("scheduled");

  const appointments = [
    {
      id: 1,
      patient: { name: "John Smith", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Sarah Johnson",
      datetime: "2024-01-25 10:00 AM",
      status: "Scheduled",
      type: "Consultation",
      duration: "30 min"
    },
    {
      id: 2,
      patient: { name: "Emily Johnson", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Michael Chen",
      datetime: "2024-01-25 11:30 AM",
      status: "Completed",
      type: "Follow-up",
      duration: "20 min"
    },
    {
      id: 3,
      patient: { name: "Robert Davis", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Sarah Johnson",
      datetime: "2024-01-25 02:00 PM",
      status: "Cancelled",
      type: "Emergency",
      duration: "45 min"
    },
    {
      id: 4,
      patient: { name: "Maria Garcia", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Emily Davis",
      datetime: "2024-01-25 03:30 PM",
      status: "Scheduled",
      type: "Consultation",
      duration: "30 min"
    }
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      'Scheduled': 'bg-blue-600 text-white',
      'Completed': 'bg-green-600 text-white',
      'Cancelled': 'bg-red-600 text-white'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-600 text-white'}>
        {status}
      </Badge>
    );
  };

  const filterAppointments = (filterStatus) => {
    if (filterStatus === 'all') return appointments;
    return appointments.filter(apt => apt.status.toLowerCase() === filterStatus.toLowerCase());
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Appointments</h2>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-black border border-gray-900">
          <TabsTrigger 
            value="all" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            All Appointments
          </TabsTrigger>
          <TabsTrigger 
            value="add" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Add Appointment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Appointment Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Nested Tabs for filtering */}
              <Tabs defaultValue="all-appointments" className="space-y-4">
                <TabsList className="bg-black border border-gray-900">
                  <TabsTrigger 
                    value="all-appointments" 
                    className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    All Appointments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="completed" 
                    className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Completed
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cancelled" 
                    className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Cancelled
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all-appointments">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-900">
                        <TableHead className="text-gray-300">Patient</TableHead>
                        <TableHead className="text-gray-300">Doctor</TableHead>
                        <TableHead className="text-gray-300">Date & Time</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Duration</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterAppointments('all').map((appointment) => (
                        <TableRow key={appointment.id} className="border-gray-900">
                          <TableCell className="text-white">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                <AvatarFallback className="bg-black text-white">
                                  {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{appointment.patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{appointment.doctor}</TableCell>
                          <TableCell className="text-gray-400">{appointment.datetime}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell className="text-gray-400">{appointment.type}</TableCell>
                          <TableCell className="text-gray-400">{appointment.duration}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-black border-gray-900">
                                <DropdownMenuItem className="text-gray-300 hover:bg-black hover:text-white">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:bg-black hover:text-white">
                                  Edit Appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:bg-black hover:text-white">
                                  Cancel Appointment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="completed">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-900">
                        <TableHead className="text-gray-300">Patient</TableHead>
                        <TableHead className="text-gray-300">Doctor</TableHead>
                        <TableHead className="text-gray-300">Date & Time</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterAppointments('completed').map((appointment) => (
                        <TableRow key={appointment.id} className="border-gray-900">
                          <TableCell className="text-white">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                <AvatarFallback className="bg-black text-white">
                                  {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{appointment.patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{appointment.doctor}</TableCell>
                          <TableCell className="text-gray-400">{appointment.datetime}</TableCell>
                          <TableCell className="text-gray-400">{appointment.type}</TableCell>
                          <TableCell className="text-gray-400">{appointment.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="cancelled">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-900">
                        <TableHead className="text-gray-300">Patient</TableHead>
                        <TableHead className="text-gray-300">Doctor</TableHead>
                        <TableHead className="text-gray-300">Date & Time</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterAppointments('cancelled').map((appointment) => (
                        <TableRow key={appointment.id} className="border-gray-900">
                          <TableCell className="text-white">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                <AvatarFallback className="bg-black text-white">
                                  {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{appointment.patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{appointment.doctor}</TableCell>
                          <TableCell className="text-gray-400">{appointment.datetime}</TableCell>
                          <TableCell className="text-gray-400">{appointment.type}</TableCell>
                          <TableCell className="text-gray-400">{appointment.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Schedule New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Form Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Appointment Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Appointment Type</label>
                      <Select>
                        <SelectTrigger className="bg-transparent border-gray-900 text-white">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-900">
                          <SelectItem value="consultation" className="text-gray-300 hover:bg-black">Consultation</SelectItem>
                          <SelectItem value="follow-up" className="text-gray-300 hover:bg-black">Follow-up</SelectItem>
                          <SelectItem value="emergency" className="text-gray-300 hover:bg-black">Emergency</SelectItem>
                          <SelectItem value="surgery" className="text-gray-300 hover:bg-black">Surgery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Time</label>
                        <Select>
                          <SelectTrigger className="bg-transparent border-gray-900 text-white">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-900">
                            <SelectItem value="09:00" className="text-gray-300 hover:bg-black">9:00 AM</SelectItem>
                            <SelectItem value="10:00" className="text-gray-300 hover:bg-black">10:00 AM</SelectItem>
                            <SelectItem value="11:00" className="text-gray-300 hover:bg-black">11:00 AM</SelectItem>
                            <SelectItem value="14:00" className="text-gray-300 hover:bg-black">2:00 PM</SelectItem>
                            <SelectItem value="15:00" className="text-gray-300 hover:bg-black">3:00 PM</SelectItem>
                            <SelectItem value="16:00" className="text-gray-300 hover:bg-black">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Duration</label>
                        <Select>
                          <SelectTrigger className="bg-transparent border-gray-900 text-white">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-900">
                            <SelectItem value="15" className="text-gray-300 hover:bg-black">15 minutes</SelectItem>
                            <SelectItem value="30" className="text-gray-300 hover:bg-black">30 minutes</SelectItem>
                            <SelectItem value="45" className="text-gray-300 hover:bg-black">45 minutes</SelectItem>
                            <SelectItem value="60" className="text-gray-300 hover:bg-black">1 hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent border-gray-900 text-white hover:bg-black"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className="text-gray-500">Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-black border-gray-900" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="bg-black text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Reason for Visit</label>
                      <Textarea 
                        placeholder="Enter reason for appointment"
                        className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Appointment Status</label>
                      <RadioGroup value={appointmentStatus} onValueChange={setAppointmentStatus}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scheduled" id="scheduled" className="border-gray-900 text-blue-600" />
                          <label htmlFor="scheduled" className="text-gray-300 text-sm">Scheduled</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="confirmed" id="confirmed" className="border-gray-900 text-blue-600" />
                          <label htmlFor="confirmed" className="text-gray-300 text-sm">Confirmed</label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Right Column - Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Patient & Doctor Selection</h3>
                  
                  <Card className="bg-black border-gray-900">
                    <CardHeader>
                      <CardTitle className="text-white text-base">Select Patient</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search patients..."
                          className="pl-9 bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div className="text-sm text-gray-400">
                        Select from patient list or search by name
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black border-gray-900">
                    <CardHeader>
                      <CardTitle className="text-white text-base">Select Doctor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select>
                        <SelectTrigger className="bg-transparent border-gray-900 text-white">
                          <SelectValue placeholder="Choose doctor" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-900">
                          <SelectItem value="dr-johnson" className="text-gray-300 hover:bg-black">
                            Dr. Sarah Johnson - Cardiology
                          </SelectItem>
                          <SelectItem value="dr-chen" className="text-gray-300 hover:bg-black">
                            Dr. Michael Chen - Neurology
                          </SelectItem>
                          <SelectItem value="dr-davis" className="text-gray-300 hover:bg-black">
                            Dr. Emily Davis - Pediatrics
                          </SelectItem>
                          <SelectItem value="dr-wilson" className="text-gray-300 hover:bg-black">
                            Dr. James Wilson - Orthopedics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-900">
                <Button variant="outline" className="border-gray-900 text-gray-300 hover:bg-black">
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
