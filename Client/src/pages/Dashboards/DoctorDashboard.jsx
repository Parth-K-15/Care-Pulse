import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { UserButton } from "@clerk/clerk-react";
import { 
  Calendar, 
  Clock, 
  Users, 
  ClipboardList,
  FileText,
  User, 
  Settings,
  Plus,
  Eye,
  History,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowUpDown
} from 'lucide-react';

const DoctorDashboard = ({ onSwitchToAdmin, onSwitchToPatient }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  // Sync user to backend on mount
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
          role: 'doctor',
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

  // Guard
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/doctor" replace />;
  
  const mockData = {
    doctor: {
      name: "Dr. Sarah",
      specialty: "Cardiology"
    },
    summary: {
      appointments: { total: 12, urgent: 3 },
      reports: { total: 8, ready: 2 },
      patients: { total: 45, new: 8 },
      tasks: { total: 7, highPriority: 2 }
    },
    appointments: [
      {
        id: 1,
        patient: "John Doe",
        time: "9:00 AM",
        type: "Consultation",
        status: "scheduled",
        avatar: "JD"
      },
      {
        id: 2,
        patient: "Sarah Smith",
        time: "10:30 AM",
        type: "Follow-up",
        status: "in-progress",
        avatar: "SS"
      },
      {
        id: 3,
        patient: "Mike Johnson",
        time: "11:45 AM",
        type: "Emergency",
        status: "urgent",
        avatar: "MJ"
      },
      {
        id: 4,
        patient: "Emily Brown",
        time: "2:00 PM",
        type: "Routine Check",
        status: "scheduled",
        avatar: "EB"
      }
    ],
    patients: [
      {
        id: 1,
        name: "Alice Wilson",
        age: 45,
        condition: "Hypertension",
        lastVisit: "2024-01-15",
        avatar: "AW",
        status: "stable"
      },
      {
        id: 2,
        name: "Robert Davis",
        age: 62,
        condition: "Diabetes",
        lastVisit: "2024-01-12",
        avatar: "RD",
        status: "needs-attention"
      },
      {
        id: 3,
        name: "Linda Garcia",
        age: 38,
        condition: "Migraine",
        lastVisit: "2024-01-10",
        avatar: "LG",
        status: "stable"
      }
    ],
    tasks: [
      {
        id: 1,
        description: "Review lab results for John Smith",
        priority: "high",
        dueDate: "Today",
        completed: false
      },
      {
        id: 2,
        description: "Complete insurance forms for Sarah Johnson",
        priority: "medium",
        dueDate: "Tomorrow",
        completed: false
      },
      {
        id: 3,
        description: "Schedule follow-up for Mike Wilson",
        priority: "low",
        dueDate: "This week",
        completed: true
      }
    ],
    stats: {
      patientsThisWeek: 23,
      completedAppointments: 18,
      pendingReports: 5,
      satisfaction: 4.8
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-black text-red-400';
      case 'in-progress': return 'bg-black text-yellow-400';
      case 'scheduled': return 'bg-black text-green-400';
      case 'completed': return 'bg-black text-blue-400';
      case 'stable': return 'bg-black text-green-400';
      case 'needs-attention': return 'bg-black text-red-400';
      default: return 'bg-black text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-black text-red-400';
      case 'medium': return 'bg-black text-yellow-400';
      case 'low': return 'bg-black text-green-400';
      default: return 'bg-black text-gray-400';
    }
  };

  const getVisitTypeColor = (type) => {
    switch (type) {
      case 'Emergency': return 'bg-black text-red-400';
      case 'Consultation': return 'bg-black text-blue-400';
      case 'Follow-up': return 'bg-black text-green-400';
      case 'Routine Check': return 'bg-black text-purple-400';
      default: return 'bg-black text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-black p-6 rounded-lg border border-gray-800">
          <div>
            <h1 className="text-3xl font-bold text-white">🌅 Good morning, {mockData.doctor.name}</h1>
            <p className="text-gray-400">🩺 {mockData.doctor.specialty} • 📅 Today's schedule</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onSwitchToAdmin}
              className="border-gray-700 text-gray-300 hover:bg-gray-900 bg-black"
            >
              ⚙️ Admin View
            </Button>
            <Button 
              variant="outline" 
              onClick={onSwitchToPatient}
              className="border-gray-700 text-gray-300 hover:bg-gray-900 bg-black"
            >
              👤 Patient View
            </Button>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonPopoverCard: "bg-black border-gray-800",
                }
              }}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">📅 Appointments</CardTitle>
              <span className="text-2xl">🏥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.appointments.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Today's schedule</p>
                <Badge className="bg-red-900 text-red-300 border-red-700">
                  🚨 {mockData.summary.appointments.urgent} urgent
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">👥 Patients</CardTitle>
              <span className="text-2xl">🧑‍⚕️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.patients.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Active patients</p>
                <Badge className="bg-green-900 text-green-300 border-green-700">
                  ✨ +{mockData.summary.patients.new} new
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">📊 Reports</CardTitle>
              <span className="text-2xl">📋</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.reports.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Pending reports</p>
                <Badge className="bg-blue-900 text-blue-300 border-blue-700">
                  ✅ {mockData.summary.reports.ready} ready
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">📝 Tasks</CardTitle>
              <span className="text-2xl">⚡</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.tasks.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Pending tasks</p>
                <Badge className="bg-red-900 text-red-300 border-red-700">
                  🔥 {mockData.summary.tasks.highPriority} high priority
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-lg border border-gray-700">
              <TabsTrigger 
                value="schedule" 
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                📅 Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="patients" 
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                👥 Patients
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                📝 Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                📊 Stats
              </TabsTrigger>
            </TabsList>


            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6 mt-6">
              {/* Schedule Sub-tabs */}
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1 rounded-lg border border-gray-700 max-w-md">
                  <TabsTrigger value="today" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📅 Today</TabsTrigger>
                  <TabsTrigger value="week" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">📆 Week</TabsTrigger>
                  <TabsTrigger value="calendar" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors text-sm">🗓️ Calendar</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="mt-6">
                  <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-white">📅 Today's Appointments</CardTitle>
                        <Button size="sm" className="bg-black hover:bg-gray-900 border border-gray-700 text-white">
                          ➕ Add Appointment
                        </Button>
                      </div>
                    </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-black rounded-lg border border-gray-900">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">
                          {appointment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{appointment.patient}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </span>
                          <Badge className={getVisitTypeColor(appointment.type)}>
                            {appointment.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-900 text-gray-300 hover:bg-black">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Upcoming This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.appointments.slice(0, 2).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-900">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-600 text-white text-xs">
                            {appointment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white text-sm">{appointment.patient}</p>
                          <p className="text-gray-400 text-xs">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">{appointment.time}</p>
                        <Badge className={getStatusColor(appointment.status)} size="sm">
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="week" className="mt-6">
                  <Card className="bg-black border-gray-800">
                    <CardContent className="p-6">
                      <p className="text-gray-400">Weekly schedule view coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="mt-6">
                  <Card className="bg-black border-gray-800">
                    <CardContent className="p-6">
                      <p className="text-gray-400">Calendar view coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Patients Tab */}
            <TabsContent value="patients" className="space-y-6 mt-6">
              <Card className="bg-black border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">👥 Patient List</CardTitle>
                    <Button size="sm" className="bg-black hover:bg-gray-900 border border-gray-700 text-white">
                      ➕ Add Patient
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.patients.map((patient) => (
                    <div key={patient.id} className="flex items-center space-x-4 p-3 bg-black rounded-lg border border-gray-900">
                      <Avatar>
                        <AvatarFallback className="bg-purple-600 text-white">
                          {patient.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{patient.name}</h4>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>Age: {patient.age}</span>
                          <span>•</span>
                          <span>{patient.condition}</span>
                          <span>•</span>
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-900 text-gray-300 hover:bg-black">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-900 text-gray-300 hover:bg-black">
                          <History className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6 mt-6">
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">Pending Tasks</CardTitle>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-4 p-3 bg-black rounded-lg border border-gray-900">
                      <Checkbox checked={task.completed} className="border-gray-900" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                            {task.description}
                          </p>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black border-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Patients This Week</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{mockData.stats.patientsThisWeek}</div>
                    <p className="text-xs text-gray-400">
                      <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                      +12% from last week
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{mockData.stats.completedAppointments}</div>
                    <p className="text-xs text-gray-400">
                      <Activity className="inline w-3 h-3 mr-1 text-blue-500" />
                      Appointments completed
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Pending Reports</CardTitle>
                    <FileText className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{mockData.stats.pendingReports}</div>
                    <p className="text-xs text-gray-400">
                      <AlertTriangle className="inline w-3 h-3 mr-1 text-yellow-500" />
                      Awaiting review
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Satisfaction</CardTitle>
                    <Activity className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{mockData.stats.satisfaction}/5</div>
                    <p className="text-xs text-gray-400">
                      <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                      Patient feedback
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Performance Overview</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your practice metrics for this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Appointment Completion Rate</span>
                      <span className="text-sm text-white">94%</span>
                    </div>
                    <div className="w-full bg-black border border-gray-900 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Patient Satisfaction</span>
                      <span className="text-sm text-white">96%</span>
                    </div>
                    <div className="w-full bg-black border border-gray-900 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Report Turnaround</span>
                      <span className="text-sm text-white">87%</span>
                    </div>
                    <div className="w-full bg-black border border-gray-900 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">On-Time Performance</span>
                      <span className="text-sm text-white">91%</span>
                    </div>
                    <div className="w-full bg-black border border-gray-900 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;