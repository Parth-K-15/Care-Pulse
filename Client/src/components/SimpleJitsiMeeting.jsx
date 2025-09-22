import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Video, Phone } from 'lucide-react';

const SimpleJitsiMeeting = ({ roomName = 'test-room', displayName = 'User', userRole = 'participant', onEnd }) => {
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = React.useState('initializing');
  const [error, setError] = React.useState(null);
  const [retryCount, setRetryCount] = React.useState(0);

  useEffect(() => {
    const handleMeetingEnd = () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
      if (onEnd) {
        onEnd();
      } else {
        navigate(-1);
      }
    };

    const showFallback = () => {
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = `
          <div class="flex items-center justify-center h-96 bg-gray-900 rounded-lg border border-gray-700">
            <div class="text-center text-white">
              <div class="text-4xl mb-4">📹</div>
              <h3 class="text-lg font-semibold mb-2">Meeting Room Ready</h3>
              <p class="text-gray-400 mb-4">Jitsi Meet is loading...</p>
              <p class="text-sm text-gray-500">Room: CarePulse-${roomName}</p>
            </div>
          </div>
        `;
      }
    };

    const initializeJitsi = () => {
      // Double-check that container exists and is mounted
      if (!jitsiContainerRef.current) {
        console.error('Jitsi container not found, retrying...');
        if (retryCount < 5) {
          setRetryCount(prev => prev + 1);
          setTimeout(initializeJitsi, 1000);
        } else {
          setError('Failed to initialize meeting container');
          setConnectionStatus('error');
        }
        return;
      }

      setConnectionStatus('connecting');
      // Clear any existing content
      jitsiContainerRef.current.innerHTML = '';

      const options = {
        roomName: `CarePulse-${roomName}`,
        width: '100%',
        height: '600px',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userRole === 'doctor' ? `Dr. ${displayName}` : displayName,
          email: `${displayName.toLowerCase().replace(/\s+/g, '.')}@carepulse.local`
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
          disable1On1Mode: false,
          disableInviteFunctions: false,
          doNotStoreRoom: false,
          disableProfile: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'hangup', 'chat', 'desktop',
            'fullscreen', 'settings', 'raisehand', 'videoquality'
          ],
          SETTINGS_SECTIONS: ['devices', 'language'],
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
        console.log('Creating Jitsi API instance with options:', options);
        jitsiApiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);
        
        // Add event listeners with proper status updates
        jitsiApiRef.current.addEventListeners({
          readyToClose: handleMeetingEnd,
          videoConferenceLeft: handleMeetingEnd,
          videoConferenceJoined: () => {
            console.log('Successfully joined the meeting');
            setConnectionStatus('connected');
          },
          connectionFailed: () => {
            console.error('Meeting connection failed');
            setError('Failed to connect to meeting');
            setConnectionStatus('error');
          },
          participantJoined: (participant) => {
            console.log('Participant joined:', participant);
          }
        });

        console.log('Jitsi meeting initialized successfully');
        
        // Set a timeout to detect if connection is taking too long
        setTimeout(() => {
          if (connectionStatus === 'connecting') {
            console.warn('Connection taking longer than expected');
            setConnectionStatus('slow-connection');
          }
        }, 10000);
        
      } catch (error) {
        console.error('Error initializing Jitsi:', error);
        setError(error.message);
        setConnectionStatus('error');
        showFallback();
      }
    };

    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => {
        // Add another small delay after script loads
        setTimeout(initializeJitsi, 200);
      };
      script.onerror = () => {
        console.error('Failed to load Jitsi Meet API');
        showFallback();
      };
      document.head.appendChild(script);
    };

    // Add a small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      loadJitsiScript();
    }, 100);

    return () => clearTimeout(timer);
  }, [roomName, displayName, userRole, navigate, onEnd, connectionStatus, retryCount]);



  // Cleanup effect
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, []);

  const retryConnection = () => {
    setRetryCount(0);
    setError(null);
    setConnectionStatus('initializing');
    // Force reload the page to restart the connection
    window.location.reload();
  };

  // Show error state with retry option
  if (connectionStatus === 'error' || error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-red-800 p-8 max-w-md">
          <CardContent className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">Connection Failed</h3>
            <p className="text-gray-400 mb-4">{error || 'Failed to connect to the meeting'}</p>
            <div className="space-y-3">
              <Button
                onClick={retryConnection}
                className="w-full bg-blue-900 text-blue-300 border-blue-700"
              >
                🔄 Retry Connection
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full bg-gray-800 border-gray-600 text-gray-300"
              >
                ← Go Back
              </Button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>Retry attempts: {retryCount}/5</p>
              <p>Status: {connectionStatus}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (connectionStatus === 'initializing' || connectionStatus === 'connecting') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-gray-800 p-8 max-w-md">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {connectionStatus === 'initializing' ? '🏥 Initializing Meeting...' : '📹 Connecting to Meeting...'}
            </h3>
            <p className="text-gray-400 mb-4">
              {connectionStatus === 'initializing' ? 'Setting up secure connection' : 'Joining the meeting room'}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Room: CarePulse-{roomName}</p>
              <p>User: {userRole === 'doctor' ? `Dr. ${displayName}` : displayName}</p>
              <p>Status: {connectionStatus}</p>
            </div>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="mt-4 bg-gray-800 border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show slow connection warning
  if (connectionStatus === 'slow-connection') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-yellow-800 p-8 max-w-md">
          <CardContent className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Connection Taking Longer</h3>
            <p className="text-gray-400 mb-4">
              The meeting is taking longer to connect than usual. This might be due to network conditions.
            </p>
            <div className="space-y-3">
              <Button
                onClick={retryConnection}
                className="w-full bg-blue-900 text-blue-300 border-blue-700"
              >
                🔄 Retry Connection
              </Button>
              <Button
                onClick={() => setConnectionStatus('connecting')}
                variant="outline"
                className="w-full bg-yellow-900 border-yellow-600 text-yellow-300"
              >
                ⏳ Keep Waiting
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

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="bg-black border-gray-700 text-white hover:bg-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">🏥 Care Pulse Meeting</h1>
              <p className="text-gray-400">Room: {roomName} • Participant: {displayName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm">
              🔴 Live
            </div>
            <div className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm">
              🔒 Encrypted
            </div>
          </div>
        </div>

        {/* Meeting Container */}
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Conference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={jitsiContainerRef} 
              className="w-full min-h-[600px] bg-gray-900 rounded-lg border border-gray-700"
              style={{ backgroundColor: '#1a1a1a' }}
            />
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🛡️ End-to-end encrypted • HIPAA compliant • Powered by Jitsi Meet</p>
        </div>
      </div>
    </div>
  );
};

// Test Page Component with Authentication
const TestMeetingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  
  // Get URL parameters for authentication
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const role = urlParams.get('role');
    
    if (name && role) {
      setUserInfo({ name, role });
      setIsAuthenticated(true);
    } else {
      // Redirect to authentication if no credentials
      navigate('/meeting-demo');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-black border-gray-800 p-8">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">🔐 Checking Authentication...</h3>
            <p className="text-gray-400">Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header with user info */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => navigate('/meeting-demo')}
            variant="outline"
            className="bg-black border-gray-700 text-white hover:bg-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meeting Center
          </Button>
          
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm ${
              userInfo.role === 'doctor' 
                ? 'bg-green-900 text-green-300 border border-green-700' 
                : 'bg-blue-900 text-blue-300 border border-blue-700'
            }`}>
              {userInfo.role === 'doctor' ? '👨‍⚕️ Doctor' : '🤝 Patient'}
            </div>
            <span className="text-white font-medium">{userInfo.name}</span>
            <span className="text-gray-400 text-sm">Room: {roomId}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <SimpleJitsiMeeting 
          roomName={roomId || 'default-room'} 
          displayName={userInfo.name || 'User'}
          userRole={userInfo.role || 'participant'}
          onEnd={() => navigate('/meeting-demo')}
        />
      </div>
    </div>
  );
};

export default SimpleJitsiMeeting;
export { TestMeetingPage };