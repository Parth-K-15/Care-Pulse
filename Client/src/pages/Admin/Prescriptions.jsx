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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CalendarIcon, MoreVertical, Plus, Trash2, Search } from "lucide-react";
import { format } from "date-fns";

export default function Prescriptions() {
  const [date, setDate] = useState();
  const [medications, setMedications] = useState([{ id: 1 }]);
  const [allowRefills, setAllowRefills] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [notifyPatient, setNotifyPatient] = useState(false);
  const [markUrgent, setMarkUrgent] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const prescriptions = [
    {
      id: 1,
      patient: { name: "John Smith", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-20",
      status: "Active",
      medications: "Lisinopril, Metformin",
      refills: 2
    },
    {
      id: 2,
      patient: { name: "Emily Johnson", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Michael Chen",
      date: "2024-01-18",
      status: "Completed",
      medications: "Sumatriptan",
      refills: 0
    },
    {
      id: 3,
      patient: { name: "Robert Davis", avatar: "/api/placeholder/40/40" },
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-22",
      status: "Pending",
      medications: "Aspirin, Atorvastatin",
      refills: 1
    }
  ];

  const medicineTemplates = [
    {
      id: 1,
      name: "Hypertension Standard",
      creator: "Dr. Sarah Johnson",
      totalUses: 45,
      lastUsed: "2024-01-20",
      createdOn: "2023-06-15",
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          route: "Oral",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take with food"
        },
        {
          name: "Hydrochlorothiazide",
          dosage: "25mg",
          route: "Oral",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take in the morning"
        }
      ]
    },
    {
      id: 2,
      name: "Diabetes Type 2",
      creator: "Dr. Emily Davis",
      totalUses: 32,
      lastUsed: "2024-01-19",
      createdOn: "2023-08-22",
      medications: [
        {
          name: "Metformin",
          dosage: "500mg",
          route: "Oral",
          frequency: "Twice daily",
          duration: "90 days",
          instructions: "Take with meals"
        }
      ]
    }
  ];

  const addMedication = () => {
    setMedications([...medications, { id: Date.now() }]);
  };

  const removeMedication = (id) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-600 text-white',
      'Completed': 'bg-blue-600 text-white',
      'Pending': 'bg-yellow-600 text-white'
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
        <h2 className="text-3xl font-bold tracking-tight text-white">Prescriptions</h2>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-black border border-gray-900">
          <TabsTrigger 
            value="all" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            All Prescriptions
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Create Prescription
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Medicine Templates
          </TabsTrigger>
        </TabsList>

        {/* All Prescriptions Tab */}
        <TabsContent value="all" className="space-y-4">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">All Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-900">
                    <TableHead className="text-gray-300">Patient</TableHead>
                    <TableHead className="text-gray-300">Doctor</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Medications</TableHead>
                    <TableHead className="text-gray-300">Refills</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id} className="border-gray-900">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={prescription.patient.avatar} alt={prescription.patient.name} />
                            <AvatarFallback className="bg-black text-white">
                              {prescription.patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{prescription.patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{prescription.doctor}</TableCell>
                      <TableCell className="text-gray-400">{prescription.date}</TableCell>
                      <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                      <TableCell className="text-gray-400">{prescription.medications}</TableCell>
                      <TableCell className="text-gray-400">{prescription.refills}</TableCell>
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
                              Edit Prescription
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-black hover:text-white">
                              Print Prescription
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

        {/* Create Prescription Tab */}
        <TabsContent value="create" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Main Form */}
            <div className="col-span-2 space-y-6">
              {/* Prescription Details */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-white">Prescription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Prescription Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent border-gray-900 text-white hover:bg-black"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className="text-gray-500">Select date</span>}
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
                      <label className="text-sm font-medium text-gray-300">Prescription Type</label>
                      <Select>
                        <SelectTrigger className="bg-transparent border-gray-900 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-900">
                          <SelectItem value="regular" className="text-gray-300 hover:bg-black">Regular</SelectItem>
                          <SelectItem value="controlled" className="text-gray-300 hover:bg-black">Controlled</SelectItem>
                          <SelectItem value="emergency" className="text-gray-300 hover:bg-black">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Diagnosis</label>
                    <Textarea 
                      placeholder="Enter diagnosis"
                      className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Use Medication Template (Optional)</label>
                    <Select>
                      <SelectTrigger className="bg-transparent border-gray-900 text-white">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-900">
                        <SelectItem value="hypertension" className="text-gray-300 hover:bg-black">Hypertension Standard</SelectItem>
                        <SelectItem value="diabetes" className="text-gray-300 hover:bg-black">Diabetes Type 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Medications Section */}
              <Card className="bg-black border-gray-900">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Medications</CardTitle>
                  <Button onClick={addMedication} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medications.map((medication, index) => (
                    <Card key={medication.id} className="bg-black border-gray-900">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-white font-medium">Medication {index + 1}</h4>
                          {medications.length > 1 && (
                            <Button
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeMedication(medication.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Medication Name</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent border-gray-900 text-white hover:bg-black"
                                >
                                  <Search className="mr-2 h-4 w-4" />
                                  Search medication...
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-0 bg-black border-gray-900" align="start">
                                <Command className="bg-black">
                                  <CommandInput placeholder="Search medications..." className="text-white" />
                                  <CommandEmpty className="text-gray-400">No medication found.</CommandEmpty>
                                  <CommandGroup className="text-white">
                                    <CommandItem className="text-gray-300 hover:bg-black">Lisinopril</CommandItem>
                                    <CommandItem className="text-gray-300 hover:bg-black">Metformin</CommandItem>
                                    <CommandItem className="text-gray-300 hover:bg-black">Aspirin</CommandItem>
                                    <CommandItem className="text-gray-300 hover:bg-black">Atorvastatin</CommandItem>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Dosage</label>
                            <Select>
                              <SelectTrigger className="bg-transparent border-gray-900 text-white">
                                <SelectValue placeholder="Select dosage" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-gray-900">
                                <SelectItem value="5mg" className="text-gray-300 hover:bg-black">5mg</SelectItem>
                                <SelectItem value="10mg" className="text-gray-300 hover:bg-black">10mg</SelectItem>
                                <SelectItem value="25mg" className="text-gray-300 hover:bg-black">25mg</SelectItem>
                                <SelectItem value="50mg" className="text-gray-300 hover:bg-black">50mg</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Route</label>
                            <Select>
                              <SelectTrigger className="bg-transparent border-gray-900 text-white">
                                <SelectValue placeholder="Select route" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-gray-900">
                                <SelectItem value="oral" className="text-gray-300 hover:bg-black">Oral</SelectItem>
                                <SelectItem value="injection" className="text-gray-300 hover:bg-black">Injection</SelectItem>
                                <SelectItem value="topical" className="text-gray-300 hover:bg-black">Topical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Frequency</label>
                            <Select>
                              <SelectTrigger className="bg-transparent border-gray-900 text-white">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-gray-900">
                                <SelectItem value="once" className="text-gray-300 hover:bg-black">Once daily</SelectItem>
                                <SelectItem value="twice" className="text-gray-300 hover:bg-black">Twice daily</SelectItem>
                                <SelectItem value="thrice" className="text-gray-300 hover:bg-black">Three times daily</SelectItem>
                                <SelectItem value="asneeded" className="text-gray-300 hover:bg-black">As needed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Duration</label>
                            <div className="flex space-x-2">
                              <Input 
                                placeholder="Duration"
                                className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                              />
                              <Select>
                                <SelectTrigger className="w-24 bg-transparent border-gray-900 text-white">
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-gray-900">
                                  <SelectItem value="days" className="text-gray-300 hover:bg-black">Days</SelectItem>
                                  <SelectItem value="weeks" className="text-gray-300 hover:bg-black">Weeks</SelectItem>
                                  <SelectItem value="months" className="text-gray-300 hover:bg-black">Months</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <label className="text-sm font-medium text-gray-300">Special Instructions</label>
                          <Textarea 
                            placeholder="Enter special instructions"
                            className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                            rows={2}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`refill-${medication.id}`}
                            checked={allowRefills}
                            onCheckedChange={setAllowRefills}
                          />
                          <label htmlFor={`refill-${medication.id}`} className="text-sm text-gray-300">
                            Allow Refills
                          </label>
                          {allowRefills && (
                            <Input 
                              type="number"
                              placeholder="Number of refills"
                              className="w-32 ml-4 bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-white">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Notes for Pharmacist</label>
                    <Textarea 
                      placeholder="Enter any notes for the pharmacist"
                      className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="save-template"
                      checked={saveAsTemplate}
                      onCheckedChange={setSaveAsTemplate}
                    />
                    <label htmlFor="save-template" className="text-sm text-gray-300">
                      Save as Template
                    </label>
                  </div>
                  
                  {saveAsTemplate && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Template Name</label>
                      <Input 
                        placeholder="Enter template name"
                        className="bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contextual Info */}
            <div className="space-y-6">
              {/* Patient Information */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-white">Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search patient..."
                      className="pl-9 bg-transparent border-gray-900 text-white placeholder:text-gray-500"
                    />
                  </div>
                  
                  {/* Patient Info Display */}
                  <div className="space-y-3 p-3 bg-black rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/api/placeholder/40/40" alt="John Smith" />
                        <AvatarFallback className="bg-black text-white">JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">John Smith</p>
                        <p className="text-gray-400 text-sm">ID: PAT001</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-300">Age: 45 | Gender: Male</p>
                      <p className="text-gray-300">DOB: 1978-05-15</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-red-600 text-white text-xs">Penicillin</Badge>
                        <Badge className="bg-red-600 text-white text-xs">Sulfa</Badge>
                      </div>
                      <p className="text-gray-400 text-xs">Allergies</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-orange-600 text-white text-xs">Hypertension</Badge>
                        <Badge className="bg-orange-600 text-white text-xs">Diabetes</Badge>
                      </div>
                      <p className="text-gray-400 text-xs">Conditions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prescription History */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-white">Prescription History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="p-2 bg-black rounded">
                      <p className="text-white text-sm">Lisinopril 10mg</p>
                      <p className="text-gray-400 text-xs">Jan 15, 2024 - Dr. Johnson</p>
                    </div>
                    <div className="p-2 bg-black rounded">
                      <p className="text-white text-sm">Metformin 500mg</p>
                      <p className="text-gray-400 text-xs">Jan 10, 2024 - Dr. Davis</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-gray-900 text-gray-300 hover:bg-black">
                    View All Prescriptions
                  </Button>
                </CardContent>
              </Card>

              {/* Prescription Options */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-white">Prescription Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Prescription Format</label>
                    <RadioGroup defaultValue="digital" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital" id="digital" className="border-gray-900 text-blue-600" />
                        <label htmlFor="digital" className="text-gray-300 text-sm">Digital</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="printed" id="printed" className="border-gray-900 text-blue-600" />
                        <label htmlFor="printed" className="text-gray-300 text-sm">Printed</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" className="border-gray-900 text-blue-600" />
                        <label htmlFor="both" className="text-gray-300 text-sm">Both</label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Notify Patient</label>
                      <Switch 
                        checked={notifyPatient}
                        onCheckedChange={setNotifyPatient}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Mark as Urgent</label>
                      <Switch 
                        checked={markUrgent}
                        onCheckedChange={setMarkUrgent}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-900">
            <Button variant="outline" className="border-gray-900 text-gray-300 hover:bg-black">
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Prescription
            </Button>
          </div>
        </TabsContent>

        {/* Medicine Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Medicine Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all-templates" className="space-y-4">
                <TabsList className="bg-black border border-gray-900">
                  <TabsTrigger 
                    value="all-templates" 
                    className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    All Templates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="my-templates" 
                    className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    My Templates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all-templates" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Templates List */}
                    <div className="space-y-4">
                      {medicineTemplates.map((template) => (
                        <Card 
                          key={template.id}
                          className={`bg-black border-gray-900 cursor-pointer transition-colors ${
                            selectedTemplate?.id === template.id ? 'border-blue-600' : 'hover:border-gray-900'
                          }`}
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-white font-medium">{template.name}</h3>
                                <p className="text-gray-400 text-sm">by {template.creator}</p>
                              </div>
                              <Badge className="bg-blue-600 text-white">
                                {template.totalUses} uses
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Template Details */}
                    <div>
                      {selectedTemplate ? (
                        <Card className="bg-black border-gray-900">
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                              <CardTitle className="text-white">{selectedTemplate.name}</CardTitle>
                              <p className="text-gray-400 text-sm">Created by {selectedTemplate.creator}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="border-gray-900 text-gray-300 hover:bg-black">
                                Edit
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Use Template
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="text-white font-medium mb-3">Medications</h4>
                              <div className="space-y-3">
                                {selectedTemplate.medications.map((med, index) => (
                                  <Card key={index} className="bg-black border-gray-900">
                                    <CardContent className="p-3">
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <p className="text-white font-medium">{med.name}</p>
                                          <p className="text-gray-400">Dosage: {med.dosage}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-400">Route: {med.route}</p>
                                          <p className="text-gray-400">Frequency: {med.frequency}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <p className="text-gray-400">Duration: {med.duration}</p>
                                          <p className="text-gray-400">Instructions: {med.instructions}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>

                            {/* Usage Statistics */}
                            <div>
                              <h4 className="text-white font-medium mb-3">Usage Statistics</h4>
                              <div className="grid grid-cols-3 gap-3">
                                <Card className="bg-black border-gray-900">
                                  <CardContent className="p-3 text-center">
                                    <p className="text-2xl font-bold text-blue-400">{selectedTemplate.totalUses}</p>
                                    <p className="text-gray-400 text-xs">Total Uses</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black border-gray-900">
                                  <CardContent className="p-3 text-center">
                                    <p className="text-sm font-medium text-white">{selectedTemplate.lastUsed}</p>
                                    <p className="text-gray-400 text-xs">Last Used</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black border-gray-900">
                                  <CardContent className="p-3 text-center">
                                    <p className="text-sm font-medium text-white">{selectedTemplate.createdOn}</p>
                                    <p className="text-gray-400 text-xs">Created On</p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="bg-black border-gray-900">
                          <CardContent className="p-8 text-center">
                            <p className="text-gray-400">Select a template to view details</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="my-templates" className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">Your templates will appear here</p>
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
