import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Users, Plus, Copy, Check, AlertCircle, Shield } from 'lucide-react';

const MeetingManager = ({ userRole = 'patient' }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [meetings, setMeetings] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    patientName: '',
    doctorName: '',
    scheduledTime: '',
    type: 'consultation'
  });
  const [copiedRoomId, setCopiedRoomId] = useState(null);

  // Mock scheduled meetings
  useEffect(() => {
    const mockMeetings = [
      {
        id: 'meeting-001',
        title: 'Cardiology Consultation',
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Wilson',
        scheduledTime: '2025-09-22T14:30:00',
        type: 'consultation',
        status: 'scheduled',
        roomId: 'cardio-consult-001'
      },
      {
        id: 'meeting-002',
        title: 'Follow-up Appointment',
        patientName: 'Emily Johnson',
        doctorName: 'Dr. Michael Chen',
        scheduledTime: '2025-09-22T16:00:00',
        type: 'follow-up',
        status: 'scheduled',
        roomId: 'followup-002'
      },
      {
        id: 'meeting-003',
        title: 'Emergency Consultation',
        patientName: 'Robert Davis',
        doctorName: 'Dr. Lisa Brown',
        scheduledTime: '2025-09-22T13:45:00',
        type: 'emergency',
        status: 'in-progress',
        roomId: 'emergency-003'
      }
    ];
    setMeetings(mockMeetings);
  }, []);

  const generateRoomId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `meeting-${timestamp}-${random}`;
  };

  const handleCreateMeeting = () => {
    const roomId = generateRoomId();
    const meeting = {
      ...newMeeting,
      id: `meeting-${Date.now()}`,
      roomId,
      status: 'scheduled',
      scheduledTime: new Date(newMeeting.scheduledTime).toISOString()
    };
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: '',
      patientName: '',
      doctorName: '',
      scheduledTime: '',
      type: 'consultation'
    });
    setIsCreating(false);
  };

  const handleJoinMeeting = (meeting) => {
    const meetingData = {
      doctorName: meeting.doctorName,
      patientName: meeting.patientName,
      appointmentTime: new Date(meeting.scheduledTime).toLocaleTimeString(),
      appointmentType: meeting.type,
      userRole: userRole
    };
    navigate(`/meeting/${meeting.roomId}`, { state: meetingData });
  };

  const handleStartInstantMeeting = () => {
    const roomId = generateRoomId();
    const meetingData = {
      doctorName: userRole === 'doctor' ? (user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Doctor') : 'Doctor',
      patientName: userRole === 'patient' ? (user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Patient') : 'Patient',
      appointmentTime: new Date().toLocaleTimeString(),
      appointmentType: 'Instant Consultation',
      userRole: userRole
    };
    navigate(`/meeting/${roomId}`, { state: meetingData });
  };

  const copyRoomId = async (roomId) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/meeting/${roomId}`);
      setCopiedRoomId(roomId);
      setTimeout(() => setCopiedRoomId(null), 2000);
    } catch (err) {
      console.error('Failed to copy room ID:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'in-progress': return 'bg-green-900 text-green-300 border-green-700';
      case 'completed': return 'bg-gray-900 text-gray-300 border-gray-700';
      default: return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'emergency': return 'bg-red-900 text-red-300 border-red-700';
      case 'consultation': return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'follow-up': return 'bg-green-900 text-green-300 border-green-700';
      default: return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'consultation': return '🩺';
      case 'follow-up': return '📋';
      default: return '💬';
    }
  };

  const isUpcoming = (scheduledTime) => {
    const now = new Date();
    const meetingTime = new Date(scheduledTime);
    const timeDiff = meetingTime - now;
    return timeDiff > 0 && timeDiff < 60 * 60 * 1000; // Within next hour
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-400" />
            📹 Meeting Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleStartInstantMeeting}
              className="bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700 h-16 text-left justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
                  🚀
                </div>
                <div>
                  <div className="font-semibold">Start Instant Meeting</div>
                  <div className="text-sm opacity-75">Begin consultation immediately</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/join-meeting')}
              variant="outline"
              className="bg-black border-green-700 text-green-300 hover:bg-green-900 h-16 text-left justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                  🔑
                </div>
                <div>
                  <div className="font-semibold">Join with Code</div>
                  <div className="text-sm opacity-75">Enter meeting code to join</div>
                </div>
              </div>
            </Button>

            {userRole === 'doctor' && (
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-black border-gray-700 text-white hover:bg-gray-900 h-16 text-left justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold">📅 Schedule Meeting</div>
                        <div className="text-sm opacity-75">Plan future consultation</div>
                      </div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>📅 Schedule New Meeting</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create a scheduled video consultation
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="text-white text-sm font-medium mb-2 block">Meeting Title</label>
                      <Input
                        id="title"
                        value={newMeeting.title}
                        onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                        placeholder="e.g., Cardiology Consultation"
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="patient" className="text-white text-sm font-medium mb-2 block">Patient Name</label>
                        <Input
                          id="patient"
                          value={newMeeting.patientName}
                          onChange={(e) => setNewMeeting({...newMeeting, patientName: e.target.value})}
                          placeholder="Patient name"
                          className="bg-black border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="doctor" className="text-white text-sm font-medium mb-2 block">Doctor Name</label>
                        <Input
                          id="doctor"
                          value={newMeeting.doctorName}
                          onChange={(e) => setNewMeeting({...newMeeting, doctorName: e.target.value})}
                          placeholder="Doctor name"
                          className="bg-black border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="time" className="text-white text-sm font-medium mb-2 block">Scheduled Time</label>
                      <Input
                        id="time"
                        type="datetime-local"
                        value={newMeeting.scheduledTime}
                        onChange={(e) => setNewMeeting({...newMeeting, scheduledTime: e.target.value})}
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleCreateMeeting}
                        className="bg-blue-900 hover:bg-blue-800 text-blue-300"
                      >
                        📅 Schedule Meeting
                      </Button>
                      <Button
                        onClick={() => setIsCreating(false)}
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-900"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Meetings */}
      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-400" />
            📋 Scheduled Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No scheduled meetings</p>
                <p className="text-sm">Start an instant meeting or schedule one above</p>
              </div>
            ) : (
              meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className={`p-4 bg-gray-900 rounded-lg border ${
                    isUpcoming(meeting.scheduledTime) ? 'border-yellow-600 bg-yellow-900/20' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{meeting.title}</h3>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                        <Badge className={getTypeColor(meeting.type)}>
                          {getTypeIcon(meeting.type)} {meeting.type}
                        </Badge>
                        {isUpcoming(meeting.scheduledTime) && (
                          <Badge className="bg-yellow-900 text-yellow-300 border-yellow-700 animate-pulse">
                            ⏰ Starting Soon
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          👨‍⚕️ {meeting.doctorName} • 🤝 {meeting.patientName}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(meeting.scheduledTime).toLocaleDateString()} at{' '}
                          {new Date(meeting.scheduledTime).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => copyRoomId(meeting.roomId)}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        {copiedRoomId === meeting.roomId ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => handleJoinMeeting(meeting)}
                        className={`${
                          meeting.status === 'in-progress' 
                            ? 'bg-green-900 hover:bg-green-800 text-green-300 border-green-700' 
                            : 'bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700'
                        }`}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {meeting.status === 'in-progress' ? '🔴 Join Now' : '📹 Join Meeting'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-black border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-sm">
            <Shield className="w-5 h-5 text-green-400" />
            <div className="text-gray-400">
              <span className="text-green-400 font-semibold">🔒 Secure & Private:</span> All meetings are end-to-end encrypted and HIPAA compliant. 
              No recordings are stored unless explicitly requested.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingManager;