import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserButton } from "@clerk/clerk-react";
import { 
  Calendar, 
  Clock, 
  Pill, 
  FileText, 
  Heart, 
  Activity, 
  Droplets, 
  User, 
  Bell,
  Download,
  Eye,
  AlertTriangle,
  Stethoscope,
  Scissors,
  Brain,
  Settings
} from 'lucide-react';

const PatientDashboard = ({ onSwitchToAdmin }) => {
  // Mock data for the dashboard
  const mockData = {
    patient: {
      name: "Sarah",
      nextAppointment: {
        date: "Tomorrow",
        time: "2:30 PM",
        doctor: "Dr. Smith"
      },
      activeMedications: 3,
      nextDose: "4:00 PM",
      newTestResults: 2,
      lastResultDate: "Dec 15, 2024"
    },
    healthMetrics: {
      heartRate: { value: 72, max: 100, unit: "bpm" },
      bloodPressure: { value: "120/80", status: "Normal" },
      glucose: { value: 95, max: 140, unit: "mg/dL" }
    },
    upcomingAppointments: [
      {
        id: 1,
        doctor: "Dr. Smith",
        avatar: "/api/placeholder/40/40",
        specialty: "Cardiologist",
        date: "Tomorrow",
        time: "2:30 PM",
        type: "Follow-up"
      },
      {
        id: 2,
        doctor: "Dr. Johnson",
        avatar: "/api/placeholder/40/40",
        specialty: "General Practice",
        date: "Next Week",
        time: "10:00 AM",
        type: "Check-up"
      }
    ],
    medications: [
      {
        id: 1,
        name: "Lisinopril",
        dose: "10mg",
        time: "8:00 AM",
        taken: false
      },
      {
        id: 2,
        name: "Metformin",
        dose: "500mg",
        time: "12:00 PM",
        taken: true
      },
      {
        id: 3,
        name: "Atorvastatin",
        dose: "20mg",
        time: "8:00 PM",
        taken: false
      }
    ],
    activeMedicationsList: [
      {
        id: 1,
        name: "Lisinopril",
        dosage: "10mg once daily",
        instructions: "Take with or without food",
        prescribedBy: "Dr. Smith",
        startDate: "Jan 15, 2024",
        refillsRemaining: 3,
        nextRefill: "Mar 15, 2025"
      },
      {
        id: 2,
        name: "Metformin",
        dosage: "500mg twice daily",
        instructions: "Take with meals",
        prescribedBy: "Dr. Johnson",
        startDate: "Dec 1, 2024",
        refillsRemaining: 5,
        nextRefill: "Feb 28, 2025"
      }
    ],
    testResults: [
      {
        id: 1,
        name: "Blood Work Results",
        description: "Complete Blood Count",
        date: "Dec 15, 2024",
        doctor: "Dr. Smith",
        isNew: true
      },
      {
        id: 2,
        name: "Cholesterol Panel",
        description: "Lipid Profile",
        date: "Dec 10, 2024",
        doctor: "Dr. Johnson",
        isNew: true
      }
    ],
    allergies: [
      { name: "Penicillin", severity: "Severe" },
      { name: "Shellfish", severity: "Moderate" }
    ],
    conditions: [
      { name: "Hypertension", year: "2020" },
      { name: "Type 2 Diabetes", year: "2022" }
    ],
    procedures: [
      { name: "Appendectomy", year: "2018" },
      { name: "Wisdom Teeth Removal", year: "2015" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {mockData.patient.name}</h1>
            <p className="text-gray-400 mt-2">Here's your health overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="lg" className="bg-black hover:bg-black">
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <div className="flex items-center space-x-3">
              {onSwitchToAdmin && (
                <Button
                  onClick={onSwitchToAdmin}
                  variant="outline"
                  size="sm"
                  className="border-gray-900 text-gray-300 hover:bg-black"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admin View
                </Button>
              )}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-black border-gray-900",
                    userButtonPopoverText: "text-gray-300"
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black border-gray-900 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">Next Appointment</CardTitle>
              <Calendar className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold text-white mb-1">
                {mockData.patient.nextAppointment.date}
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {mockData.patient.nextAppointment.time} with {mockData.patient.nextAppointment.doctor}
              </p>
              <Button variant="link" className="text-blue-400 p-0 h-auto font-medium">
                View details
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-900 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">Medications</CardTitle>
              <Pill className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold text-white mb-1">
                {mockData.patient.activeMedications} Active
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Next dose at {mockData.patient.nextDose}
              </p>
              <Button variant="link" className="text-blue-400 p-0 h-auto font-medium">
                View all medications
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-900 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-white">Test Results</CardTitle>
              <FileText className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold text-white mb-1">
                {mockData.patient.newTestResults} New
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Last result: {mockData.patient.lastResultDate}
              </p>
              <Button variant="link" className="text-blue-400 p-0 h-auto font-medium">
                View results
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black border border-gray-900">
            <TabsTrigger 
              value="overview" 
              className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-gray-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-gray-900"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="medications" 
              className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-gray-900"
            >
              Medications
            </TabsTrigger>
            <TabsTrigger 
              value="records" 
              className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-gray-900"
            >
              Records
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Summary Card */}
              <Card className="bg-black border-gray-900 rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-white text-lg">
                    <Heart className="mr-2 h-5 w-5 text-red-400" />
                    Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-red-400" />
                      <span className="text-white">Heart Rate</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{mockData.healthMetrics.heartRate.value} {mockData.healthMetrics.heartRate.unit}</div>
                      <div className="w-24 bg-black border border-gray-900 rounded-full h-3 mt-1">
                        <div 
                          className="bg-red-500 h-3 rounded-full" 
                          style={{ width: `${(mockData.healthMetrics.heartRate.value / mockData.healthMetrics.heartRate.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-5 w-5 text-blue-400" />
                      <span className="text-white">Blood Pressure</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{mockData.healthMetrics.bloodPressure.value}</div>
                      <Badge className="bg-black text-green-400 border border-gray-900 mt-1">
                        {mockData.healthMetrics.bloodPressure.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-5 w-5 text-orange-400" />
                      <span className="text-white">Glucose Level</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{mockData.healthMetrics.glucose.value} {mockData.healthMetrics.glucose.unit}</div>
                      <div className="w-24 bg-black border border-gray-900 rounded-full h-3 mt-1">
                        <div 
                          className="bg-orange-500 h-3 rounded-full" 
                          style={{ width: `${(mockData.healthMetrics.glucose.value / mockData.healthMetrics.glucose.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments Card */}
              <Card className="bg-black border-gray-900 rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-white text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-black rounded-xl border border-gray-900">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={appointment.avatar} />
                        <AvatarFallback className="bg-black text-white border border-gray-900">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{appointment.doctor}</p>
                        <p className="text-sm text-gray-300">{appointment.specialty}</p>
                        <p className="text-sm text-gray-400">{appointment.date} at {appointment.time}</p>
                      </div>
                      <Badge className="bg-black text-blue-400 border border-gray-900 px-3 py-1">
                        {appointment.date}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-gray-900 hover:bg-black text-white mt-4">
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              {/* Medication Reminders Card */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                    Medication Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.medications.map((medication) => (
                    <div key={medication.id} className="flex items-center space-x-4 p-3 bg-black border border-gray-900 rounded-lg">
                      <Checkbox 
                        id={`med-${medication.id}`}
                        checked={medication.taken}
                        className="border-gray-900"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-400">{medication.dose} at {medication.time}</p>
                      </div>
                      <Badge variant={medication.taken ? "default" : "outline"} 
                             className={medication.taken ? "bg-green-900 text-green-300" : "border-yellow-400 text-yellow-400"}>
                        {medication.taken ? "Taken" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Health Tips Card */}
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-400" />
                    Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-black rounded-lg">
                      <h4 className="font-medium text-purple-300">Heart Health</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Aim for 30 minutes of moderate exercise daily to maintain cardiovascular health.
                      </p>
                    </div>
                    <div className="p-3 bg-black rounded-lg">
                      <h4 className="font-medium text-green-300">Nutrition</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Include more omega-3 rich foods like salmon and walnuts in your diet.
                      </p>
                    </div>
                    <div className="p-3 bg-black rounded-lg">
                      <h4 className="font-medium text-blue-300">Hydration</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Drink at least 8 glasses of water daily to support overall health.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            {/* Upcoming Appointments */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-black border-gray-900">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Stethoscope className="h-8 w-8 text-blue-400" />
                          <div>
                            <h4 className="font-semibold">{appointment.type}</h4>
                            <p className="text-sm text-gray-400">{appointment.specialty}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          {appointment.date}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="text-gray-400">Date:</span> {appointment.date}</p>
                        <p className="text-sm"><span className="text-gray-400">Time:</span> {appointment.time}</p>
                        <p className="text-sm"><span className="text-gray-400">Doctor:</span> {appointment.doctor}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>
                        <Button size="sm" className="flex-1 bg-black hover:bg-black">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Past Appointments */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Past</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black border-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Stethoscope className="h-8 w-8 text-gray-400" />
                        <div>
                          <h4 className="font-semibold">Annual Check-up</h4>
                          <p className="text-sm text-gray-400">General Practice</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-black text-gray-300">
                        Completed
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><span className="text-gray-400">Date:</span> Dec 1, 2024</p>
                      <p className="text-sm"><span className="text-gray-400">Time:</span> 10:00 AM</p>
                      <p className="text-sm"><span className="text-gray-400">Doctor:</span> Dr. Johnson</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Results
                      </Button>
                      <Button size="sm" className="flex-1 bg-black hover:bg-black">
                        Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            {/* Active Medications */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Active Medications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.activeMedicationsList.map((medication) => (
                  <Card key={medication.id} className="bg-black border-gray-900">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Pill className="h-8 w-8 text-green-400" />
                          <div>
                            <h4 className="font-semibold">{medication.name}</h4>
                            <p className="text-sm text-gray-400">{medication.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-900 text-green-300">Active</Badge>
                          <Bell className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="text-gray-400">Instructions:</span> {medication.instructions}</p>
                        <p className="text-sm"><span className="text-gray-400">Prescribed by:</span> {medication.prescribedBy}</p>
                        <p className="text-sm"><span className="text-gray-400">Start Date:</span> {medication.startDate}</p>
                        <p className="text-sm"><span className="text-gray-400">Refills Remaining:</span> {medication.refillsRemaining}</p>
                        <p className="text-sm"><span className="text-gray-400">Next Refill:</span> {medication.nextRefill}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Request Refill
                        </Button>
                        <Button size="sm" className="flex-1 bg-black hover:bg-black">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Medication History */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Medication History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black border-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Pill className="h-8 w-8 text-gray-400" />
                        <div>
                          <h4 className="font-semibold">Amoxicillin</h4>
                          <p className="text-sm text-gray-400">500mg three times daily</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-black text-gray-300">
                        Completed
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-gray-400">Prescribed by:</span> Dr. Smith</p>
                      <p className="text-sm"><span className="text-gray-400">Start Date:</span> Nov 1, 2024</p>
                      <p className="text-sm"><span className="text-gray-400">End Date:</span> Nov 15, 2024</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            {/* Recent Test Results */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Test Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.testResults.map((result) => (
                  <Card key={result.id} className="bg-black border-gray-900">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-purple-400" />
                          <div>
                            <h4 className="font-semibold">{result.name}</h4>
                            <p className="text-sm text-gray-400">{result.description}</p>
                          </div>
                        </div>
                        {result.isNew && (
                          <Badge className="bg-purple-900 text-purple-300">New</Badge>
                        )}
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="text-gray-400">Date:</span> {result.date}</p>
                        <p className="text-sm"><span className="text-gray-400">Ordered by:</span> {result.doctor}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="flex-1 bg-black hover:bg-black">
                              <Eye className="mr-2 h-4 w-4" />
                              View Results
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-black border-gray-900 text-white">
                            <DialogHeader>
                              <DialogTitle>{result.name}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                {result.description} - {result.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm">Detailed test results and analysis would be displayed here.</p>
                              <div className="bg-black p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Summary</h4>
                                <p className="text-sm text-gray-300">All values within normal range. Continue current treatment plan.</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Medical History</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Allergies */}
                <Card className="bg-black border-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                      Allergies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockData.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{allergy.name}</span>
                        <Badge variant={allergy.severity === 'Severe' ? 'destructive' : 'secondary'}>
                          {allergy.severity}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Conditions */}
                <Card className="bg-black border-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="mr-2 h-5 w-5 text-blue-400" />
                      Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockData.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{condition.name}</span>
                        <Badge variant="outline" className="border-gray-900 text-gray-300">
                          {condition.year}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Procedures */}
                <Card className="bg-black border-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Scissors className="mr-2 h-5 w-5 text-green-400" />
                      Procedures
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockData.procedures.map((procedure, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{procedure.name}</span>
                        <Badge variant="outline" className="border-gray-900 text-gray-300">
                          {procedure.year}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* AI Summarize Button */}
              <div className="mt-6 flex justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Brain className="mr-2 h-5 w-5" />
                  Summarize Medical History
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
