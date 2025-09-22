import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Video, Users, Link, Calendar } from 'lucide-react';

const SharedMeetingDemo = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [generatedRoom, setGeneratedRoom] = useState('');
  const [copied, setCopied] = useState(false);

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
    const meetingLink = `${window.location.origin}/test-meeting/${roomId}`;
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
      navigate(`/test-meeting/${roomId.trim()}`);
    }
  };

  // Start new meeting
  const startNewMeeting = () => {
    const newRoomId = generateRoomId();
    navigate(`/test-meeting/${newRoomId}`);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🏥 Care Pulse Meeting Center</h1>
          <p className="text-gray-400">Join the same meeting from both doctor and patient accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Start New Meeting */}
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-green-400" />
                👨‍⚕️ Start as Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Start a new meeting and share the link with your patient
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
                      {`${window.location.origin}/test-meeting/${generatedRoom}`}
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
                🤝 Join as Patient
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Enter the meeting room ID shared by your doctor
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
              Open these links in different browser tabs/windows to simulate doctor and patient joining the same meeting:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-900 text-green-300 border-green-700">👨‍⚕️ Doctor</Badge>
                </div>
                <Button
                  onClick={() => navigate('/test-meeting/demo-consultation-room')}
                  className="w-full bg-green-900 hover:bg-green-800 text-green-300 mb-2"
                >
                  Join as Doctor
                </Button>
                <code className="text-xs text-gray-500 break-all">
                  /test-meeting/demo-consultation-room
                </code>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-900 text-blue-300 border-blue-700">🤝 Patient</Badge>
                </div>
                <Button
                  onClick={() => navigate('/test-meeting/demo-consultation-room')}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-blue-300 mb-2"
                >
                  Join as Patient
                </Button>
                <code className="text-xs text-gray-500 break-all">
                  /test-meeting/demo-consultation-room
                </code>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-300 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                💡 <strong>Pro Tip:</strong> Both buttons above lead to the same meeting room! 
                Open in separate browser tabs to test simultaneous joining.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-black border-gray-800 mt-6">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">🎯 How to Test Simultaneous Joining:</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>Option 1 - Same Browser:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Right-click "Join as Doctor" → "Open in new tab"</li>
                <li>Right-click "Join as Patient" → "Open in new tab"</li>
                <li>Both tabs will join the same meeting room!</li>
              </ul>
              
              <p className="pt-2"><strong>Option 2 - Different Browsers:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Open Chrome: Go to doctor link</li>
                <li>Open Firefox/Edge: Go to patient link</li>
                <li>Both will be in the same video call!</li>
              </ul>
              
              <p className="pt-2"><strong>Option 3 - Different Devices:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Computer: Doctor joins the meeting</li>
                <li>Phone/Tablet: Patient joins using same room ID</li>
                <li>Perfect for real consultations!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharedMeetingDemo;