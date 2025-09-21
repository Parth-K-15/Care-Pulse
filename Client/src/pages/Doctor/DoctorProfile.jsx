import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, Star, MapPin, Phone, Mail, Users, Clock, Languages } from 'lucide-react';

const DoctorProfile = () => {
  const navigate = useNavigate();
  
  // Mock data based on the reference images
  const doctorData = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    status: "Active",
    rating: 4.8,
    reviews: 87,
    avatar: "/api/placeholder/150/150",
    email: "sarah.johnson@medixpro.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Blvd, Suite 456, New York, NY 10001",
    patients: 120,
    experience: 8,
    languages: ["English", "Spanish"],
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 8 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    education: [
      {
        degree: "MD",
        institution: "Harvard Medical School",
        year: "2012"
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Massachusetts General Hospital",
        year: "2015"
      },
      {
        degree: "Fellowship in Cardiology",
        institution: "Johns Hopkins Hospital",
        year: "2018"
      }
    ],
    certifications: [
      {
        name: "Board Certification in Cardiology",
        organization: "American Board of Internal Medicine",
        year: "2018"
      },
      {
        name: "Advanced Cardiac Life Support (ACLS)",
        organization: "American Heart Association",
        year: "2022"
      }
    ],
    weeklySchedule: {
      Monday: "09:00 AM - 05:00 PM",
      Tuesday: "09:00 AM - 05:00 PM",
      Wednesday: "09:00 AM - 05:00 PM",
      Thursday: "09:00 AM - 05:00 PM",
      Friday: "09:00 AM - 03:00 PM",
      Saturday: "10:00 AM - 01:00 PM",
      Sunday: "Closed"
    },
    todaySchedule: [
      {
        time: "09:00 AM",
        patient: "John Smith",
        type: "Check-up",
        status: "Completed"
      },
      {
        time: "10:30 AM",
        patient: "Emily Davis",
        type: "Consultation",
        status: "Completed"
      }
    ],
    appointmentHistory: [
      {
        patient: "John Smith",
        date: "2023-04-22",
        time: "09:00 AM",
        type: "Check-up",
        status: "Completed"
      },
      {
        patient: "Emily Davis",
        date: "2023-04-22",
        time: "10:30 AM",
        type: "Consultation",
        status: "Completed"
      },
      {
        patient: "Michael Brown",
        date: "2023-04-22",
        time: "01:00 PM",
        type: "Follow-up",
        status: "Scheduled"
      },
      {
        patient: "Jessica Wilson",
        date: "2023-04-22",
        time: "03:30 PM",
        type: "New Patient",
        status: "Scheduled"
      }
    ],
    performanceMetrics: {
      patientSatisfaction: 92,
      appointmentCompletion: 98,
      recordCompletionRate: 95
    },
    timeManagement: {
      averageWaitTime: 12,
      averageConsultationTime: 25
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-400 hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">👨‍⚕️ Doctor Profile</h1>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Doctor Info Card */}
          <div className="w-80 flex-shrink-0">
            <Card className="bg-black border-gray-800 sticky top-6">
              <CardContent className="p-6">
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={doctorData.avatar} alt={doctorData.name} />
                    <AvatarFallback className="bg-gray-800 text-white text-lg">
                      👨‍⚕️
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-white mb-1">{doctorData.name}</h2>
                  <p className="text-gray-400 mb-3">{doctorData.specialty}</p>
                  
                  <Badge className="bg-green-900 text-green-300 border-green-700 mb-4">
                    ✅ {doctorData.status}
                  </Badge>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{doctorData.rating}</span>
                    <span className="text-gray-400">• {doctorData.reviews} reviews</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">📧 Email</p>
                      <p className="text-white text-sm">{doctorData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">📞 Phone</p>
                      <p className="text-white text-sm">{doctorData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">📍 Address</p>
                      <p className="text-white text-sm">{doctorData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">👥 Patients</p>
                      <p className="text-white text-sm">{doctorData.patients} active patients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">⏱️ Experience</p>
                      <p className="text-white text-sm">{doctorData.experience} years</p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">🌐 Languages</h3>
                  <div className="flex gap-2">
                    {doctorData.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div>
                  <h3 className="text-white font-semibold mb-3">📅 Weekly Schedule</h3>
                  <div className="space-y-2">
                    {Object.entries(doctorData.weeklySchedule).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-400">{day}:</span>
                        <span className="text-white">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-lg border border-gray-700">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  📊 Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="appointments" 
                  className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  📅 Appointments
                </TabsTrigger>
                <TabsTrigger 
                  value="patients" 
                  className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  👥 Patients
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  📈 Performance
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* About Section */}
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">📋 About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{doctorData.about}</p>
                  </CardContent>
                </Card>

                {/* Education & Certifications */}
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">🎓 Education & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Education */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">📚 Education</h4>
                      <div className="space-y-4">
                        {doctorData.education.map((edu, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">{edu.degree}</p>
                              <p className="text-gray-400 text-sm">{edu.institution}</p>
                            </div>
                            <Badge variant="outline" className="border-gray-700 text-gray-300">
                              {edu.year}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">🏆 Certifications</h4>
                      <div className="space-y-4">
                        {doctorData.certifications.map((cert, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">{cert.name}</p>
                              <p className="text-gray-400 text-sm">{cert.organization}</p>
                            </div>
                            <Badge variant="outline" className="border-gray-700 text-gray-300">
                              {cert.year}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card className="bg-black border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">📅 Today's Schedule</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-900">
                      📅 View Calendar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {doctorData.todaySchedule.map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800">
                          <div className="flex items-center gap-3">
                            <div className="text-white font-medium">{appointment.time}</div>
                            <div>
                              <p className="text-white text-sm">{appointment.patient}</p>
                              <p className="text-gray-400 text-xs">{appointment.type}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-900 text-green-300 border-green-700">
                            ✅ {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-6 mt-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">📅 Appointment History</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">View and manage all appointments</p>
                    </div>
                    <Button className="bg-black hover:bg-gray-900 border border-gray-700 text-white">
                      ➕ New Appointment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Patient</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorData.appointmentHistory.map((appointment, index) => (
                            <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                              <td className="py-3 px-4 text-white">{appointment.patient}</td>
                              <td className="py-3 px-4 text-gray-300">{appointment.date}</td>
                              <td className="py-3 px-4 text-gray-300">{appointment.time}</td>
                              <td className="py-3 px-4 text-gray-300">{appointment.type}</td>
                              <td className="py-3 px-4">
                                <Badge 
                                  className={
                                    appointment.status === 'Completed' 
                                      ? "bg-green-900 text-green-300 border-green-700" 
                                      : "bg-blue-900 text-blue-300 border-blue-700"
                                  }
                                >
                                  {appointment.status === 'Completed' ? '✅' : '📅'} {appointment.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients" className="space-y-6 mt-6">
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">👥 Patient Management</CardTitle>
                    <p className="text-gray-400 text-sm">Patient list and management tools coming soon...</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-gray-400">Patient management interface will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <Card className="bg-black border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">📊 Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Patient Satisfaction</span>
                          <span className="text-white font-semibold">{doctorData.performanceMetrics.patientSatisfaction}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${doctorData.performanceMetrics.patientSatisfaction}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Appointment Completion</span>
                          <span className="text-white font-semibold">{doctorData.performanceMetrics.appointmentCompletion}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${doctorData.performanceMetrics.appointmentCompletion}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Record Completion Rate</span>
                          <span className="text-white font-semibold">{doctorData.performanceMetrics.recordCompletionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${doctorData.performanceMetrics.recordCompletionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Management */}
                  <Card className="bg-black border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">⏱️ Time Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-300 text-sm">Average Wait Time</p>
                            <p className="text-gray-400 text-xs">Time patients wait before being seen</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold text-lg">{doctorData.timeManagement.averageWaitTime} minutes</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-300 text-sm">Average Consultation Time</p>
                            <p className="text-gray-400 text-xs">Time spent with each patient</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold text-lg">{doctorData.timeManagement.averageConsultationTime} minutes</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;