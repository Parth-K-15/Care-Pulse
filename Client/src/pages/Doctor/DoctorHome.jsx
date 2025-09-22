import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Calendar,
  Clock,
  Users,
  ClipboardList,
  FileText,
  History,
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Plus,
  Eye,
  Video,
  Phone,
} from 'lucide-react';

const DoctorHome = () => {
  const navigate = useNavigate();

  // Quick Meeting Card Component
  const QuickMeetingCard = ({ title, description, icon, action }) => {
    const handleMeetingAction = () => {
      const roomId = generateRoomId();
      const meetingData = {
        doctorName: mockData.doctor.name,
        patientName: action === 'emergency' ? 'Emergency Patient' : 'Patient',
        appointmentTime: new Date().toLocaleTimeString(),
        appointmentType: action === 'emergency' ? 'Emergency Consultation' : 
                        action === 'start' ? 'Instant Consultation' : 'Scheduled Meeting',
        userRole: 'doctor'
      };

      navigate(`/meeting/${roomId}`, { state: meetingData });
    };

    const getCardColor = () => {
      switch (action) {
        case 'emergency': return 'border-red-700 hover:border-red-600';
        case 'start': return 'border-blue-700 hover:border-blue-600';
        case 'join': return 'border-green-700 hover:border-green-600';
        default: return 'border-gray-700 hover:border-gray-600';
      }
    };

    const getButtonColor = () => {
      switch (action) {
        case 'emergency': return 'bg-red-900 hover:bg-red-800 text-red-300 border-red-700';
        case 'start': return 'bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700';
        case 'join': return 'bg-green-900 hover:bg-green-800 text-green-300 border-green-700';
        default: return 'bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-700';
      }
    };

    return (
      <Card className={`bg-black border transition-colors ${getCardColor()}`}>
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-3">{icon}</div>
          <h3 className="font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          <Button 
            onClick={handleMeetingAction}
            className={`w-full ${getButtonColor()}`}
            size="sm"
          >
            <Video className="w-4 h-4 mr-2" />
            {action === 'emergency' ? 'Start Emergency' : 
             action === 'start' ? 'Start Meeting' : 'Join Meeting'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Generate unique room ID
  const generateRoomId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `dr-${timestamp}-${random}`;
  };

  const mockData = {
    doctor: {
      name: 'Dr. Sarah',
      specialty: 'Cardiology',
    },
    summary: {
      appointments: { total: 12, urgent: 3 },
      reports: { total: 8, ready: 2 },
      patients: { total: 45, new: 8 },
      tasks: { total: 7, highPriority: 2 },
    },
    appointments: [
      { id: 1, patient: 'John Doe', time: '9:00 AM', type: 'Consultation', status: 'scheduled', avatar: 'JD' },
      { id: 2, patient: 'Sarah Smith', time: '10:30 AM', type: 'Follow-up', status: 'in-progress', avatar: 'SS' },
      { id: 3, patient: 'Mike Johnson', time: '11:45 AM', type: 'Emergency', status: 'urgent', avatar: 'MJ' },
      { id: 4, patient: 'Emily Brown', time: '2:00 PM', type: 'Routine Check', status: 'scheduled', avatar: 'EB' },
    ],
    patients: [
      { id: 1, name: 'Alice Wilson', age: 45, condition: 'Hypertension', lastVisit: '2024-01-15', avatar: 'AW', status: 'stable' },
      { id: 2, name: 'Robert Davis', age: 62, condition: 'Diabetes', lastVisit: '2024-01-12', avatar: 'RD', status: 'needs-attention' },
      { id: 3, name: 'Linda Garcia', age: 38, condition: 'Migraine', lastVisit: '2024-01-10', avatar: 'LG', status: 'stable' },
    ],
    tasks: [
      { id: 1, description: 'Review lab results for John Smith', priority: 'high', dueDate: 'Today', completed: false },
      { id: 2, description: 'Complete insurance forms for Sarah Johnson', priority: 'medium', dueDate: 'Tomorrow', completed: false },
      { id: 3, description: 'Schedule follow-up for Mike Wilson', priority: 'low', dueDate: 'This week', completed: true },
    ],
    stats: { patientsThisWeek: 23, completedAppointments: 18, pendingReports: 5, satisfaction: 4.8 },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-black text-red-400';
      case 'in-progress':
        return 'bg-black text-yellow-400';
      case 'scheduled':
        return 'bg-black text-green-400';
      case 'completed':
        return 'bg-black text-blue-400';
      case 'stable':
        return 'bg-black text-green-400';
      case 'needs-attention':
        return 'bg-black text-red-400';
      default:
        return 'bg-black text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-black text-red-400';
      case 'medium':
        return 'bg-black text-yellow-400';
      case 'low':
        return 'bg-black text-green-400';
      default:
        return 'bg-black text-gray-400';
    }
  };

  const getVisitTypeColor = (type) => {
    switch (type) {
      case 'Emergency':
        return 'bg-black text-red-400';
      case 'Consultation':
        return 'bg-black text-blue-400';
      case 'Follow-up':
        return 'bg-black text-green-400';
      case 'Routine Check':
        return 'bg-black text-purple-400';
      default:
        return 'bg-black text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Good morning, {mockData.doctor.name}</h1>
            <p className="text-gray-400">{mockData.doctor.specialty} • Today's schedule</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.appointments.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Today's schedule</p>
                <Badge className="bg-black text-red-400 border-gray-900">
                  {mockData.summary.appointments.urgent} urgent
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.patients.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Active patients</p>
                <Badge className="bg-black text-green-400 border-gray-900">+{mockData.summary.patients.new} new</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Reports</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.reports.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Pending reports</p>
                <Badge className="bg-black text-green-400 border-gray-900">{mockData.summary.reports.ready} ready</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Tasks</CardTitle>
              <ClipboardList className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.summary.tasks.total}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-sm">Pending tasks</p>
                <Badge className="bg-black text-red-400 border-gray-900">{mockData.summary.tasks.highPriority} high priority</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Meeting Section */}
        <div className="mt-8 mb-8">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-400" />
                📹 Video Consultations
              </CardTitle>
              <CardDescription className="text-gray-400">
                Start instant meetings or join scheduled consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickMeetingCard 
                  title="Start New Meeting"
                  description="Begin instant consultation"
                  icon="🚀"
                  action="start"
                />
                <QuickMeetingCard 
                  title="Emergency Consultation"
                  description="Priority medical meeting"
                  icon="🚨"
                  action="emergency"
                />
                <QuickMeetingCard 
                  title="Join Waiting Room"
                  description="Connect to scheduled meeting"
                  icon="⏰"
                  action="join"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black border border-gray-900">
              <TabsTrigger value="schedule" className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white">Schedule</TabsTrigger>
              <TabsTrigger value="patients" className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white">Patients</TabsTrigger>
              <TabsTrigger value="tasks" className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white">Tasks</TabsTrigger>
              <TabsTrigger value="stats" className="text-gray-400 data-[state=active]:bg-black data-[state=active]:text-white">Stats</TabsTrigger>
            </TabsList>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6 mt-6">
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">Today's Appointments</CardTitle>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Appointment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-black rounded-lg border border-gray-900">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">{appointment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{appointment.patient}</h4>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </span>
                          <Badge className={getVisitTypeColor(appointment.type)}>{appointment.type}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            const roomId = `appointment-${appointment.id}-${Date.now()}`;
                            const meetingData = {
                              doctorName: mockData.doctor.name,
                              patientName: appointment.patient,
                              appointmentTime: appointment.time,
                              appointmentType: appointment.type,
                              userRole: 'doctor'
                            };
                            navigate(`/meeting/${roomId}`, { state: meetingData });
                          }}
                          className="bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          📹 Join
                        </Button>
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
                          <AvatarFallback className="bg-green-600 text-white text-xs">{appointment.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white text-sm">{appointment.patient}</p>
                          <p className="text-gray-400 text-xs">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">{appointment.time}</p>
                        <Badge className={getStatusColor(appointment.status)} size="sm">{appointment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patients Tab */}
            <TabsContent value="patients" className="space-y-6 mt-6">
              <Card className="bg-black border-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">Patient List</CardTitle>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.patients.map((patient) => (
                    <div key={patient.id} className="flex items-center space-x-4 p-3 bg-black rounded-lg border border-gray-900">
                      <Avatar>
                        <AvatarFallback className="bg-purple-600 text-white">{patient.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{patient.name}</h4>
                          <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>Age: {patient.age}</span>
                          <span>•</span>
                          <span>{patient.condition}</span>
                          <span>•</span>
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
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
                          <p className={`${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.description}</p>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
