import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor, Settings, Users } from 'lucide-react';

const JitsiMeeting = ({ 
  roomName, 
  displayName, 
  userRole = 'participant',
  onMeetingEnd,
  containerStyle = {}
}) => {
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState(1);


  useEffect(() => {
    if (!roomName || !displayName) {
      setIsLoading(false);
      return;
    }

    // Ensure container is mounted before initializing
    if (!jitsiContainerRef.current) {
      const timer = setTimeout(() => {
        if (jitsiContainerRef.current) {
          loadJitsiAPI();
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    const loadJitsiAPI = () => {
      // Check if already loaded
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }
      
      // Load Jitsi Meet External API script
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => {
        // Add a small delay to ensure DOM is ready
        setTimeout(initializeJitsi, 100);
      };
      script.onerror = () => {
        console.error('Failed to load Jitsi Meet API');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    const initializeJitsi = () => {
      if (!window.JitsiMeetExternalAPI) {
        console.error('Jitsi Meet API not loaded');
        setIsLoading(false);
        return;
      }

      if (!jitsiContainerRef.current) {
        console.error('Jitsi container not ready, retrying...');
        // Retry after a short delay
        setTimeout(initializeJitsi, 200);
        return;
      }

      const domain = 'meet.jit.si';
      const options = {
        roomName: `CarePulse-${roomName}`,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: displayName,
          email: `${displayName.toLowerCase().replace(/\s+/g, '.')}@carepulse.com`
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableModeratorIndicator: false,
          startScreenSharing: false,
          enableEmailInStats: false,
          enableClosePage: false,
          disable1On1Mode: true,
          disableInviteFunctions: true,
          doNotStoreRoom: true,
          disableProfile: true,
          hideConferenceSubject: false,
          hideConferenceTimer: false,
          hideParticipantsStats: false,
          startAudioOnly: false,
          channelLastN: -1,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          ],
          SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          MOBILE_APP_PROMO: false,
          NATIVE_APP_NAME: 'Care Pulse',
          PROVIDER_NAME: 'Care Pulse Medical',
          SHOW_CHROME_EXTENSION_BANNER: false,
        }
      };

      try {
        // Initialize Jitsi API
        jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        
        // Event listeners
        jitsiApiRef.current.addEventListeners({
          readyToClose: handleMeetingEnd,
          participantJoined: handleParticipantJoined,
          participantLeft: handleParticipantLeft,
          videoConferenceJoined: handleMeetingJoined,
          videoConferenceLeft: handleMeetingEnd,
          audioMuteStatusChanged: handleAudioMuteChanged,
          videoMuteStatusChanged: handleVideoMuteChanged,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize Jitsi meeting:', error);
        setIsLoading(false);
      }
    };

    // Event handlers
    const handleMeetingJoined = () => {
      console.log('Meeting joined successfully');
    };

    const handleMeetingEnd = () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
      if (onMeetingEnd) {
        onMeetingEnd();
      } else {
        navigate(-1); // Go back to previous page
      }
    };

    const handleParticipantJoined = (participant) => {
      setParticipants(prev => prev + 1);
      console.log('Participant joined:', participant);
    };

    const handleParticipantLeft = (participant) => {
      setParticipants(prev => Math.max(1, prev - 1));
      console.log('Participant left:', participant);
    };

    const handleAudioMuteChanged = (event) => {
      setIsMuted(event.muted);
    };

    const handleVideoMuteChanged = (event) => {
      setIsVideoOff(event.muted);
    };

    // Load Jitsi API
    if (window.JitsiMeetExternalAPI) {
      initializeJitsi();
    } else {
      loadJitsiAPI();
    }

    // Cleanup on unmount
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [roomName, displayName, navigate, onMeetingEnd]);

  const toggleAudio = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
    }
  };

  const toggleScreenShare = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleShareScreen');
    }
  };

  const endMeeting = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Card className="bg-black border-gray-800 p-8">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">🏥 Connecting to Meeting...</h3>
            <p className="text-gray-400">Initializing secure video conference</p>
            <Badge className="mt-4 bg-blue-900 text-blue-300 border-blue-700">
              📹 Room: CarePulse-{roomName}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error fallback for missing room or display name
  if (!roomName || !displayName) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Card className="bg-black border-red-800 p-8">
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold text-red-400 mb-2">⚠️ Meeting Configuration Error</h3>
            <p className="text-gray-400 mb-4">Missing required meeting information</p>
            <div className="text-sm text-gray-500">
              <p>Room Name: {roomName || 'Not provided'}</p>
              <p>Display Name: {displayName || 'Not provided'}</p>
            </div>
            <Button
              onClick={() => navigate(-1)}
              className="mt-4 bg-blue-900 text-blue-300 border-blue-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-black" style={containerStyle}>
      {/* Meeting Header */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Card className="bg-black/80 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-900 text-green-300 border-green-700">
                🔴 Live
              </Badge>
              <span className="text-white font-medium">
                👥 {participants} participant{participants !== 1 ? 's' : ''}
              </span>
              <span className="text-gray-400 text-sm">
                📹 Room: {roomName}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            onClick={toggleAudio}
            variant="outline"
            size="sm"
            className={`border-gray-700 ${isMuted ? 'bg-red-900 text-red-300 border-red-700' : 'bg-black text-white'}`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={toggleVideo}
            variant="outline"
            size="sm"
            className={`border-gray-700 ${isVideoOff ? 'bg-red-900 text-red-300 border-red-700' : 'bg-black text-white'}`}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </Button>

          <Button
            onClick={toggleScreenShare}
            variant="outline"
            size="sm"
            className="bg-black text-white border-gray-700"
          >
            <Monitor className="w-4 h-4" />
          </Button>

          <Button
            onClick={endMeeting}
            variant="destructive"
            size="sm"
            className="bg-red-900 text-red-300 border-red-700 hover:bg-red-800"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Jitsi Meeting Container */}
      <div 
        ref={jitsiContainerRef} 
        id={`jitsi-container-${roomName}`}
        className="w-full h-full min-h-screen"
        style={{ backgroundColor: '#000', position: 'relative' }}
      />

      {/* Meeting Info Footer */}
      <div className="absolute bottom-4 left-4 right-4 z-50">
        <Card className="bg-black/80 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4 text-gray-400">
                <span>🩺 Care Pulse Medical Conference</span>
                <span>👤 {displayName}</span>
                <span>🏷️ {userRole}</span>
              </div>
              <div className="text-gray-500">
                Powered by Jitsi Meet - End-to-End Encrypted
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JitsiMeeting;