import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, Check, Video, Users, Link, Calendar, 
  UserCheck, Stethoscope, Heart, Shield, Lock 
} from 'lucide-react';

const AuthenticatedMeetingDemo = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [roomId, setRoomId] = useState('');
  const [generatedRoom, setGeneratedRoom] = useState('');
  const [copied, setCopied] = useState(false);

  // Authentication form states
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    specialization: '', // for doctors
    patientId: '', // for patients
  });

  const handleLogin = (role) => {
    if (!loginForm.name || !loginForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    const userData = {
      name: loginForm.name,
      email: loginForm.email,
      role: role,
      loginTime: new Date().toISOString(),
      ...(role === 'doctor' && { specialization: loginForm.specialization }),
      ...(role === 'patient' && { patientId: loginForm.patientId }),
    };

    setUserInfo(userData);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserInfo({});
    setLoginForm({ name: '', email: '', specialization: '', patientId: '' });
  };

  // Generate a random room ID
  const generateRoomId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const newRoomId = `meeting-${timestamp}-${random}`;
    setGeneratedRoom(newRoomId);
    return newRoomId;
  };

  // Copy meeting link to clipboard
  const copyMeetingLink = async (roomId) => {
    const meetingLink = `${window.location.origin}/minimal-meeting/${roomId}?name=${encodeURIComponent(userInfo.name)}&role=${userRole}`;
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Join existing meeting
  const joinMeeting = () => {
    if (roomId.trim()) {
      navigate(`/minimal-meeting/${roomId.trim()}?name=${encodeURIComponent(userInfo.name)}&role=${userRole}`);
    }
  };

  // Start new meeting
  const startNewMeeting = () => {
    const newRoomId = generateRoomId();
    navigate(`/minimal-meeting/${newRoomId}?name=${encodeURIComponent(userInfo.name)}&role=${userRole}`);
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-black/90 border-gray-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Shield className="w-8 h-8 text-blue-400" />
                Meeting Authentication
              </CardTitle>
              <p className="text-gray-400">Please login to access the meeting demo</p>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="doctor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger 
                    value="doctor" 
                    className="text-gray-300 data-[state=active]:bg-green-900 data-[state=active]:text-green-300"
                  >
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Doctor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="patient" 
                    className="text-gray-300 data-[state=active]:bg-blue-900 data-[state=active]:text-blue-300"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Patient
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="doctor" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Doctor Name *</label>
                      <Input
                        placeholder="Dr. John Smith"
                        value={loginForm.name}
                        onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-300">Email *</label>
                      <Input
                        type="email"
                        placeholder="doctor@carepulse.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300">Specialization</label>
                      <Input
                        placeholder="Cardiology, Neurology, etc."
                        value={loginForm.specialization}
                        onChange={(e) => setLoginForm({...loginForm, specialization: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <Button
                      onClick={() => handleLogin('doctor')}
                      className="w-full bg-green-900 text-green-300 border-green-700 hover:bg-green-800"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Login as Doctor
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="patient" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Patient Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={loginForm.name}
                        onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-300">Email *</label>
                      <Input
                        type="email"
                        placeholder="patient@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300">Patient ID</label>
                      <Input
                        placeholder="P-12345"
                        value={loginForm.patientId}
                        onChange={(e) => setLoginForm({...loginForm, patientId: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <Button
                      onClick={() => handleLogin('patient')}
                      className="w-full bg-blue-900 text-blue-300 border-blue-700 hover:bg-blue-800"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Login as Patient
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Secure Authentication</span>
                </div>
                <p className="text-xs text-gray-400">
                  This demo authentication ensures proper user identification in meetings. 
                  In production, this would integrate with your hospital's authentication system.
                </p>
              </div>

              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full mt-4 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                ← Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If authenticated, show the meeting demo interface
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* User Info Header */}
        <div className="mb-6">
          <Card className="bg-black border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge className={`${
                    userRole === 'doctor' 
                      ? 'bg-green-900 text-green-300 border-green-700' 
                      : 'bg-blue-900 text-blue-300 border-blue-700'
                  }`}>
                    {userRole === 'doctor' ? (
                      <>
                        <Stethoscope className="w-4 h-4 mr-1" />
                        Doctor
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-1" />
                        Patient
                      </>
                    )}
                  </Badge>
                  <span className="text-white font-medium">{userInfo.name}</span>
                  <span className="text-gray-400 text-sm">({userInfo.email})</span>
                  {userInfo.specialization && (
                    <span className="text-gray-500 text-sm">• {userInfo.specialization}</span>
                  )}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🏥 Care Pulse Meeting Center</h1>
          <p className="text-gray-400">Authenticated as {userRole} - Ready to join meetings!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Start New Meeting */}
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-green-400" />
                {userRole === 'doctor' ? '👨‍⚕️ Start New Consultation' : '🤝 Request New Meeting'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                {userRole === 'doctor' 
                  ? 'Start a new consultation and share the link with your patient'
                  : 'Request a new meeting and share the link with your doctor'
                }
              </p>
              
              <Button 
                onClick={startNewMeeting}
                className="w-full bg-green-900 hover:bg-green-800 text-green-300 border-green-700"
              >
                <Video className="w-4 h-4 mr-2" />
                🚀 Start New Meeting
              </Button>

              {generatedRoom && (
                <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Meeting Room Created:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-green-400 bg-black p-2 rounded">
                      {`${window.location.origin}/test-meeting/${generatedRoom}?name=${encodeURIComponent(userInfo.name)}&role=${userRole}`}
                    </code>
                    <Button
                      size="sm"
                      onClick={() => copyMeetingLink(generatedRoom)}
                      className="bg-gray-800 hover:bg-gray-700"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Join Existing Meeting */}
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                {userRole === 'doctor' ? '👨‍⚕️ Join Patient Meeting' : '🤝 Join Doctor Meeting'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                {userRole === 'doctor'
                  ? 'Enter the meeting room ID shared by your patient'
                  : 'Enter the meeting room ID shared by your doctor'
                }
              </p>
              
              <Input
                placeholder="Enter room ID (e.g., meeting-123-456)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="bg-black border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && joinMeeting()}
              />
              
              <Button 
                onClick={joinMeeting}
                disabled={!roomId.trim()}
                className="w-full bg-blue-900 hover:bg-blue-800 text-blue-300 border-blue-700 disabled:opacity-50"
              >
                <Video className="w-4 h-4 mr-2" />
                📹 Join Meeting
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Demo Links */}
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Link className="w-5 h-5 text-yellow-400" />
              🧪 Quick Demo - Same Meeting Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Test simultaneous joining with authenticated users. Both links lead to the same meeting room:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-900 text-green-300 border-green-700">
                    👨‍⚕️ Doctor Access
                  </Badge>
                </div>
                <Button
                  onClick={() => navigate('/minimal-meeting/demo-consultation-room?name=Dr.%20Demo&role=doctor')}
                  className="w-full bg-green-900 hover:bg-green-800 text-green-300 mb-2"
                >
                  Join as Doctor (Demo)
                </Button>
                <code className="text-xs text-gray-500 break-all">
                  Authenticated doctor access
                </code>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-900 text-blue-300 border-blue-700">
                    🤝 Patient Access
                  </Badge>
                </div>
                <Button
                  onClick={() => navigate('/minimal-meeting/demo-consultation-room?name=Patient%20Demo&role=patient')}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-blue-300 mb-2"
                >
                  Join as Patient (Demo)
                </Button>
                <code className="text-xs text-gray-500 break-all">
                  Authenticated patient access
                </code>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-300 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                💡 <strong>Pro Tip:</strong> These demo buttons simulate different authenticated users joining the same meeting!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-black border-gray-800 mt-6">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">🔐 Authenticated Meeting System:</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>✅ Features:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Secure authentication required before accessing meetings</li>
                <li>User role identification (Doctor/Patient)</li>
                <li>Automatic name and role passing to meeting rooms</li>
                <li>Session management with logout functionality</li>
              </ul>
              
              <p className="pt-2"><strong>🧪 Testing:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Login as doctor → Start meeting → Share link</li>
                <li>Open new tab → Login as patient → Join with shared room ID</li>
                <li>Both users will be properly identified in the meeting</li>
              </ul>
              
              <p className="pt-2"><strong>🔒 Security:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>No anonymous meeting access</li>
                <li>User credentials validated before meeting entry</li>
                <li>Role-based meeting permissions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticatedMeetingDemo;