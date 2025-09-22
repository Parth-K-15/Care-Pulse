import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoIcon, KeyIcon, UserIcon, ClipboardIcon, QrCodeIcon } from 'lucide-react';

const JoinMeetingPage = () => {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userRole, setUserRole] = useState('patient');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinByCode = async (e) => {
    e.preventDefault();
    if (!meetingCode.trim() || !displayName.trim()) {
      alert('Please enter both meeting code and your name');
      return;
    }

    setIsJoining(true);
    
    // Clean the meeting code (remove spaces, convert to lowercase)
    const cleanCode = meetingCode.trim().toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the meeting with the code - use minimal meeting for direct access
          navigate(`/direct-meeting/${cleanCode}?name=${encodeURIComponent(displayName)}&role=${userRole}`);
  };

  const generateSampleCode = () => {
    const codes = [
      'doctor-consultation-001',
      'patient-checkup-abc',
      'emergency-meeting-xyz',
      'followup-session-123'
    ];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setMeetingCode(randomCode);
  };

  const quickJoinOptions = [
    {
      title: '🩺 Doctor Consultation',
      code: 'doctor-consultation-' + Date.now().toString().slice(-4),
      description: 'Join a scheduled consultation'
    },
    {
      title: '🏥 Emergency Room',
      code: 'emergency-' + Date.now().toString().slice(-4),
      description: 'Quick emergency consultation'
    },
    {
      title: '💊 Follow-up Session',
      code: 'followup-' + Date.now().toString().slice(-4),
      description: 'Post-treatment follow-up'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-black/90 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              <VideoIcon className="w-8 h-8 text-blue-400" />
              Join Care Pulse Meeting
            </CardTitle>
            <p className="text-gray-400">Enter a meeting code to join or create a new session</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="code" className="text-gray-300 data-[state=active]:bg-blue-900 data-[state=active]:text-blue-300">
                  <KeyIcon className="w-4 h-4 mr-2" />
                  Meeting Code
                </TabsTrigger>
                <TabsTrigger value="quick" className="text-gray-300 data-[state=active]:bg-green-900 data-[state=active]:text-green-300">
                  <QrCodeIcon className="w-4 h-4 mr-2" />
                  Quick Join
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="space-y-4">
                <form onSubmit={handleJoinByCode} className="space-y-4">
                  {/* Meeting Code Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Meeting Code *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter meeting code (e.g., doctor-consultation-001)"
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                        required
                      />
                      <Button
                        type="button"
                        onClick={generateSampleCode}
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Meeting codes are case-insensitive and spaces will be converted to hyphens
                    </p>
                  </div>

                  {/* Display Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Join as
                    </label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => setUserRole('patient')}
                        variant={userRole === 'patient' ? 'default' : 'outline'}
                        className={userRole === 'patient' 
                          ? 'bg-blue-900 text-blue-300 border-blue-700' 
                          : 'bg-gray-800 border-gray-600 text-gray-300'
                        }
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        Patient
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setUserRole('doctor')}
                        variant={userRole === 'doctor' ? 'default' : 'outline'}
                        className={userRole === 'doctor' 
                          ? 'bg-green-900 text-green-300 border-green-700' 
                          : 'bg-gray-800 border-gray-600 text-gray-300'
                        }
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        Doctor
                      </Button>
                    </div>
                  </div>

                  {/* Join Button */}
                  <Button
                    type="submit"
                    disabled={isJoining || !meetingCode.trim() || !displayName.trim()}
                    className="w-full bg-blue-900 text-blue-300 border-blue-700 hover:bg-blue-800 disabled:opacity-50"
                  >
                    {isJoining ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
                        Joining Meeting...
                      </>
                    ) : (
                      <>
                        <VideoIcon className="w-4 h-4 mr-2" />
                        Join Meeting
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="quick" className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">Quick Join Options</h3>
                  <p className="text-sm text-gray-400">
                    Choose a meeting type and join instantly with a generated code
                  </p>
                  
                  {quickJoinOptions.map((option, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-600 hover:border-gray-500 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-white">{option.title}</h4>
                            <p className="text-sm text-gray-400">{option.description}</p>
                            <Badge className="mt-2 bg-gray-700 text-gray-300 text-xs">
                              Code: {option.code}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => {
                              setMeetingCode(option.code);
                              if (displayName.trim()) {
                                navigate(`/minimal-meeting/${option.code}?name=${encodeURIComponent(displayName)}&role=${userRole}`);
                              } else {
                                // Switch to code tab to enter name
                                setMeetingCode(option.code);
                              }
                            }}
                            className="bg-green-900 text-green-300 border-green-700 hover:bg-green-800"
                          >
                            <VideoIcon className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Name input for quick join */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Your Name (for quick join)
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name for quick join"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                ← Go Back
              </Button>
              <Button
                onClick={() => navigate('/meeting-demo')}
                variant="outline"
                className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Meeting Demo →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-black/50 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-medium text-white mb-2">🔒 Secure & Private</h4>
              <p className="text-sm text-gray-400">
                All meetings are end-to-end encrypted and HIPAA compliant for medical consultations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-medium text-white mb-2">📱 Cross-Platform</h4>
              <p className="text-sm text-gray-400">
                Works on desktop, tablet, and mobile devices. No downloads required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinMeetingPage;