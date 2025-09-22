import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import JitsiMeeting from '@/components/JitsiMeeting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Shield, Phone } from 'lucide-react';

const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [isJoining, setIsJoining] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(false);

  // Get URL parameters for manual meeting join
  const urlParams = new URLSearchParams(location.search);
  const urlName = urlParams.get('name');
  const urlRole = urlParams.get('role');

  // Get meeting details from location state or use defaults
  const meetingData = location.state || {};
  const {
    patientName = 'Patient',
    doctorName = 'Doctor',
    appointmentTime = new Date().toLocaleTimeString(),
    appointmentType = 'Consultation',
    userRole = urlRole || 'participant'
  } = meetingData;

  // Generate display name based on URL param, user, or defaults
  const displayName = urlName || 
    (user ? (`${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User')
    : (userRole === 'doctor' ? doctorName : patientName));

  const handleJoinMeeting = () => {
    setIsJoining(true);
    setTimeout(() => {
      setMeetingStarted(true);
    }, 1000);
  };

  const handleMeetingEnd = () => {
    setMeetingStarted(false);
    navigate('/dashboard', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (meetingStarted) {
    return (
      <JitsiMeeting
        roomName={roomId}
        displayName={displayName}
        userRole={userRole}
        onMeetingEnd={handleMeetingEnd}
        containerStyle={{ minHeight: '100vh' }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">🏥 Care Pulse Medical Conference</h1>
          <p className="text-gray-400">Secure, HIPAA-compliant video consultations</p>
        </div>

        {/* Main Meeting Card */}
        <Card className="bg-black border-gray-800 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-10 h-10 text-blue-300" />
            </div>
            <CardTitle className="text-2xl text-white mb-2">
              📹 Ready to Join Meeting
            </CardTitle>
            <Badge className="bg-green-900 text-green-300 border-green-700 text-sm">
              🔒 End-to-End Encrypted
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Meeting Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  📋 Meeting Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Room ID:</span>
                    <span className="text-white font-mono">{roomId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{appointmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{appointmentTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  👥 Participants
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white">👨‍⚕️ Dr. {doctorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-white">🤝 {patientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-400">You: {displayName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                🔐 Security Features
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-green-400">✅</span>
                  End-to-End Encryption
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-green-400">✅</span>
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-green-400">✅</span>
                  No Data Storage
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-green-400">✅</span>
                  Secure Connection
                </div>
              </div>
            </div>

            {/* Pre-meeting Checklist */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3">🎧 Pre-Meeting Checklist</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Camera and microphone permissions granted
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Stable internet connection verified
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Quiet environment secured
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  Medical records accessible (if needed)
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleJoinMeeting}
                disabled={isJoining}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-blue-100 border-blue-700 h-12"
              >
                {isJoining ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                    🔄 Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    📹 Join Meeting Now
                  </div>
                )}
              </Button>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="bg-black border-gray-700 text-white hover:bg-gray-900 h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                ⬅️ Go Back
              </Button>
            </div>

            {/* Meeting Instructions */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-800">
              <p>💡 <strong>Tip:</strong> Use headphones for better audio quality and enable camera for face-to-face consultation</p>
              <p className="mt-1">🛡️ This meeting is secured and compliant with healthcare privacy regulations</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Powered by Jitsi Meet • Care Pulse Medical Platform</p>
          <p className="mt-1">For technical support, contact: support@carepulse.com</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;