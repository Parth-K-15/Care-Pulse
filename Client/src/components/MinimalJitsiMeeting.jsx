import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const MinimalJitsiMeeting = ({ roomName = 'test-room', displayName = 'User', userRole = 'participant', onEnd }) => {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let connectionTimeout;

    const cleanup = () => {
      if (connectionTimeout) clearTimeout(connectionTimeout);
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (err) {
          console.error('Error disposing Jitsi API:', err);
        }
        apiRef.current = null;
      }
    };

    const initJitsi = async () => {
      try {
        if (!mounted) return;

        // Wait for container to be ready
        if (!containerRef.current) {
          setTimeout(initJitsi, 100);
          return;
        }

        setStatus('connecting');

        // Load Jitsi API if not available
        if (!window.JitsiMeetExternalAPI) {
          await loadJitsiAPI();
        }

        if (!mounted) return;

        // Create the meeting
        const options = {
          roomName: `CarePulse-${roomName.replace(/[^a-zA-Z0-9-]/g, '-')}`,
          width: '100%',
          height: '500px',
          parentNode: containerRef.current,
          userInfo: {
            displayName: userRole === 'doctor' ? `Dr. ${displayName}` : displayName,
            email: `${displayName.toLowerCase().replace(/\s+/g, '.')}@carepulse.com`
          },
          configOverwrite: {
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableInviteFunctions: false,
            doNotStoreRoom: false,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'hangup', 'chat', 'desktop',
              'fullscreen', 'settings', 'raisehand'
            ],
          }
        };

        console.log('Creating Jitsi meeting with options:', options);
        
        // Clear container before creating meeting
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);
        console.log('Jitsi API instance created');

        // Set connection timeout
        connectionTimeout = setTimeout(() => {
          if (mounted && (status === 'connecting' || status === 'loading')) {
            console.warn('Connection timeout reached');
            setError('Connection timeout - the meeting is taking too long to load');
            setStatus('error');
          }
        }, 20000);

        // Add event listeners
        apiRef.current.addEventListeners({
          videoConferenceJoined: () => {
            if (mounted) {
              console.log('Successfully joined meeting');
              setStatus('connected');
              if (connectionTimeout) clearTimeout(connectionTimeout);
            }
          },
          participantJoined: (participant) => {
            console.log('Participant joined:', participant);
          },
          readyToClose: () => {
            console.log('Meeting ready to close');
            cleanup();
            if (onEnd) {
              onEnd();
            } else {
              navigate(-1);
            }
          },
          videoConferenceLeft: () => {
            console.log('Left video conference');
            cleanup();
            if (onEnd) {
              onEnd();
            } else {
              navigate(-1);
            }
          },
          connectionFailed: () => {
            console.error('Connection failed');
            if (mounted) {
              setError('Failed to connect to the meeting server');
              setStatus('error');
            }
          }
        });

      } catch (err) {
        console.error('Failed to initialize Jitsi:', err);
        if (mounted) {
          setError(err.message || 'Failed to connect to meeting');
          setStatus('error');
        }
      }
    };

    const loadJitsiAPI = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = () => {
          console.log('Jitsi API loaded successfully');
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Failed to load Jitsi API'));
        };
        document.head.appendChild(script);
      });
    };

    // Start initialization
    initJitsi();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [roomName, displayName, userRole, navigate, onEnd, status]);

  const retry = () => {
    setError(null);
    setStatus('loading');
    // Force remount by changing key would be better, but this works
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  if (status === 'error' || error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-red-800 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">❌</div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">Connection Failed</h3>
            <p className="text-gray-400 mb-6">{error || 'Unable to connect to the meeting'}</p>
            <div className="space-y-3">
              <Button onClick={retry} className="w-full bg-blue-900 text-blue-300">
                🔄 Try Again
              </Button>
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline" 
                className="w-full bg-gray-800 border-gray-600 text-gray-300"
              >
                ← Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'loading' || status === 'connecting') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-gray-800 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {status === 'loading' ? '⚡ Loading Meeting...' : '🔗 Connecting...'}
            </h3>
            <p className="text-gray-400 mb-4">
              {status === 'loading' ? 'Preparing your meeting room' : 'Joining the meeting'}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Room: {roomName}</p>
              <p>As: {userRole === 'doctor' ? `Dr. ${displayName}` : displayName}</p>
            </div>
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="bg-gray-800 border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Simple header */}
      <div className="p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-black border-gray-700 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Leave Meeting
          </Button>
          <div className="text-white">
            <span className="font-medium">{userRole === 'doctor' ? `Dr. ${displayName}` : displayName}</span>
            <span className="text-gray-400 ml-2">• {roomName}</span>
          </div>
        </div>
      </div>

      {/* Meeting container */}
      <div 
        ref={containerRef}
        className="w-full bg-black"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  );
};

// Simple test page component
export const MinimalTestMeetingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const role = urlParams.get('role');
    
    if (name && role) {
      setUserInfo({ name, role });
      setIsReady(true);
    } else {
      navigate('/meeting-demo');
    }
  }, [navigate]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <MinimalJitsiMeeting 
      roomName={roomId || 'default-room'} 
      displayName={userInfo.name}
      userRole={userInfo.role}
      onEnd={() => navigate('/meeting-demo')}
    />
  );
};

export default MinimalJitsiMeeting;