import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  Settings,
  Video,
  Phone
} from 'lucide-react';

const PatientDashboard = ({ onSwitchToAdmin }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Meeting functions
  const startMeeting = (appointment) => {
    const roomId = `patient-${appointment.id}-${Date.now()}`;
    const meetingData = {
      doctorName: appointment.doctor,
      patientName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'Patient' : 'Patient',
      appointmentTime: appointment.time,
      appointmentType: appointment.specialty,
      userRole: 'patient'
    };
    navigate(`/meeting/${roomId}`, { state: meetingData });
  };

  useEffect(() => {
    const sync = async () => {
      try {
        if (!user) return;
        const payload = {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          role: 'patient',
        };
        await fetch('http://localhost:5000/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.warn('User sync failed:', e);
      }
    };
    sync();
  }, [user]);

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/patient" replace />;
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
        <div className="flex justify-between items-center bg-black p-6 rounded-lg border border-gray-800">
          <div>
            <h1 className="text-4xl font-bold text-white">👋 Welcome back, {mockData.patient.name}</h1>
            <p className="text-gray-400 mt-2">📊 Here's your comprehensive health overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="lg" className="bg-black hover:bg-gray-900 border border-gray-700 text-white">
              📅 Book Appointment
            </Button>
            <div className="flex items-center space-x-3">
              {onSwitchToAdmin && (
                <Button
                  onClick={onSwitchToAdmin}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-900 bg-black"
                >
                  ⚙️ Admin View
                </Button>
              )}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-black border-gray-800",
                    userButtonPopoverText: "text-gray-300"
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">📅 Next Appointment</CardTitle>
              <span className="text-2xl">🏥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockData.patient.nextAppointment.date}
              </div>
              <p className="text-gray-400 text-sm">
                {mockData.patient.nextAppointment.time} with {mockData.patient.nextAppointment.doctor}
              </p>
              <Button variant="link" className="text-blue-400 p-0 h-auto mt-2 hover:text-blue-300">
                View details →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">💊 Medications</CardTitle>
              <span className="text-2xl">⚕️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockData.patient.activeMedications} Active
              </div>
              <p className="text-gray-400 text-sm">
                Next dose at {mockData.patient.nextDose}
              </p>
              <Button variant="link" className="text-green-400 p-0 h-auto mt-2 hover:text-green-300">
                View all medications →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">📋 Test Results</CardTitle>
              <span className="text-2xl">🔬</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockData.patient.newTestResults} New
              </div>
              <p className="text-gray-400 text-sm">
                Last result: {mockData.patient.lastResultDate}
              </p>
              <Button variant="link" className="text-purple-400 p-0 h-auto mt-2 hover:text-purple-300">
                View results →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-lg border border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors">📊 Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors">📅 Appointments</TabsTrigger>
            <TabsTrigger value="medications" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors">💊 Medications</TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors">📋 Records</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Health Metrics Sub-tabs */}
            <Tabs defaultValue="vitals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1 rounded-lg border border-gray-700 max-w-md">
                <TabsTrigger value="vitals" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">❤️ Vitals</TabsTrigger>
                <TabsTrigger value="metrics" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📊 Metrics</TabsTrigger>
                <TabsTrigger value="trends" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📈 Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="vitals" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Health Summary Card */}
                  <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        ❤️ Health Summary
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Your current vital signs and health metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">💓</span>
                          <div>
                            <span className="text-sm text-gray-300">Heart Rate</span>
                            <p className="text-xs text-gray-500">Resting BPM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{mockData.healthMetrics.heartRate.value} {mockData.healthMetrics.heartRate.unit}</div>
                          <div className="w-20 bg-gray-800 rounded-full h-2 mt-1">
                            <div 
                              className="bg-red-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(mockData.healthMetrics.heartRate.value / mockData.healthMetrics.heartRate.max) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🩸</span>
                          <div>
                            <span className="text-sm text-gray-300">Blood Pressure</span>
                            <p className="text-xs text-gray-500">Systolic/Diastolic</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{mockData.healthMetrics.bloodPressure.value}</div>
                          <Badge variant="secondary" className="bg-green-900 text-green-300 border-green-700 mt-1">
                            ✅ {mockData.healthMetrics.bloodPressure.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🍯</span>
                          <div>
                            <span className="text-sm text-gray-300">Glucose Level</span>
                            <p className="text-xs text-gray-500">Blood sugar</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{mockData.healthMetrics.glucose.value} {mockData.healthMetrics.glucose.unit}</div>
                          <div className="w-20 bg-gray-800 rounded-full h-2 mt-1">
                            <div 
                              className="bg-orange-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(mockData.healthMetrics.glucose.value / mockData.healthMetrics.glucose.max) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Appointments Card */}
                  <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        📅 Upcoming Appointments
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Your scheduled medical appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockData.upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback className="bg-gray-800 text-white">👨‍⚕️</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-white">{appointment.doctor}</p>
                            <p className="text-sm text-gray-400">{appointment.specialty}</p>
                            <p className="text-sm text-gray-400">{appointment.date} at {appointment.time}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => startMeeting(appointment)}
                              className="bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700"
                            >
                              <Video className="w-4 h-4 mr-1" />
                              📹 Join Meeting
                            </Button>
                            <Badge variant="outline" className="border-blue-400 text-blue-400 text-center">
                              {appointment.date}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-700 bg-black text-white">
                        📅 View All Appointments
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-black border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">📊 Health Metrics Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Detailed health metrics and analytics coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-black border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">📈 Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">Health trends and historical data coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            {/* Appointments Sub-tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1 rounded-lg border border-gray-700 max-w-md">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">🔜 Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📅 Past</TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📋 Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">🔜 Upcoming Appointments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-gray-900 border-gray-800">
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
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">📅 Past Appointments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">🏥</span>
                            <div>
                              <h4 className="font-semibold text-white">Annual Check-up</h4>
                              <p className="text-sm text-gray-400">General Practice</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                            ✅ Completed
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-300"><span className="text-gray-400">Date:</span> Dec 1, 2024</p>
                          <p className="text-sm text-gray-300"><span className="text-gray-400">Time:</span> 10:00 AM</p>
                          <p className="text-sm text-gray-300"><span className="text-gray-400">Doctor:</span> Dr. Johnson</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 border-gray-700 hover:bg-gray-900 bg-black text-white">
                            📋 View Results
                          </Button>
                          <Button size="sm" className="flex-1 bg-black hover:bg-gray-900 border border-gray-700 text-white">
                            📝 Notes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">📋 Schedule New Appointment</h3>
                  <Card className="bg-black border-gray-800">
                    <CardContent className="p-6">
                      <p className="text-gray-400">Appointment scheduling interface coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            {/* Medications Sub-tabs */}
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1 rounded-lg border border-gray-700 max-w-md">
                <TabsTrigger value="active" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">💊 Active</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📜 History</TabsTrigger>
                <TabsTrigger value="reminders" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">⏰ Reminders</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">💊 Active Medications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.activeMedicationsList.map((medication) => (
                  <Card key={medication.id} className="bg-gray-900 border-gray-800">
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
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">📜 Medication History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">💊</span>
                            <div>
                              <h4 className="font-semibold text-white">Amoxicillin</h4>
                              <p className="text-sm text-gray-400">500mg three times daily</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                            ✅ Completed
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-300"><span className="text-gray-400">Prescribed by:</span> Dr. Smith</p>
                          <p className="text-sm text-gray-300"><span className="text-gray-400">Start Date:</span> Nov 1, 2024</p>
                          <p className="text-sm text-gray-300"><span className="text-gray-400">End Date:</span> Nov 15, 2024</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reminders" className="mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">⏰ Medication Reminders</h3>
                  <Card className="bg-black border-gray-800">
                    <CardContent className="p-6">
                      <p className="text-gray-400">Medication reminder settings coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            {/* Recent Test Results */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Test Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.testResults.map((result) => (
                  <Card key={result.id} className="bg-gray-900 border-gray-800">
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
                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Eye className="mr-2 h-4 w-4" />
                              View Results
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-800 text-white">
                            <DialogHeader>
                              <DialogTitle>{result.name}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                {result.description} - {result.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm">Detailed test results and analysis would be displayed here.</p>
                              <div className="bg-gray-800 p-4 rounded-lg">
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
                <Card className="bg-gray-900 border-gray-800">
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
                <Card className="bg-gray-900 border-gray-800">
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
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {condition.year}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Procedures */}
                <Card className="bg-gray-900 border-gray-800">
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
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
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