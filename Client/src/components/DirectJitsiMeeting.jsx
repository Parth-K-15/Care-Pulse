import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const DirectJitsiMeeting = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const apiRef = useRef(null);

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

  useEffect(() => {
    if (!isReady || !roomId) return;

    let mounted = true;
    let timeoutId;

    const initializeMeeting = async () => {
      try {
        console.log('Starting direct Jitsi initialization...');
        setIsLoading(true);
        setError(null);

        // Wait for container
        if (!containerRef.current) {
          setTimeout(initializeMeeting, 100);
          return;
        }

        // Load Jitsi API if needed
        if (!window.JitsiMeetExternalAPI) {
          console.log('Loading Jitsi API...');
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://meet.jit.si/external_api.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Jitsi API'));
            document.head.appendChild(script);
          });
        }

        if (!mounted) return;

        console.log('Creating Jitsi meeting...');
        
        // Clean room name
        const cleanRoomName = roomId.replace(/[^a-zA-Z0-9-]/g, '-');
        
        const options = {
          roomName: cleanRoomName,
          width: '100%',
          height: '100%',
          parentNode: containerRef.current,
          userInfo: {
            displayName: userInfo.role === 'doctor' ? `Dr. ${userInfo.name}` : userInfo.name,
          },
          configOverwrite: {
            enableWelcomePage: false,
            prejoinPageEnabled: false,
          }
        };

        console.log('Jitsi options:', options);
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);

        // Set timeout
        timeoutId = setTimeout(() => {
          if (mounted && isLoading) {
            setError('Connection timeout. Please try again.');
            setIsLoading(false);
          }
        }, 30000);

        // Event listeners
        apiRef.current.addEventListeners({
          videoConferenceJoined: () => {
            console.log('Meeting joined successfully');
            if (mounted) {
              setIsLoading(false);
              if (timeoutId) clearTimeout(timeoutId);
            }
          },
          readyToClose: () => {
            navigate('/meeting-demo');
          }
        });

        console.log('Jitsi meeting initialized');

      } catch (err) {
        console.error('Failed to initialize meeting:', err);
        if (mounted) {
          setError(err.message || 'Failed to load meeting');
          setIsLoading(false);
        }
      }
    };

    initializeMeeting();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (err) {
          console.error('Error disposing Jitsi API:', err);
        }
      }
    };
  }, [isReady, roomId, userInfo, navigate, isLoading]);

  const retry = () => {
    setError(null);
    setIsLoading(true);
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    if (apiRef.current) {
      try {
        apiRef.current.dispose();
      } catch (err) {
        console.error('Error disposing during retry:', err);
      }
      apiRef.current = null;
    }
    // Re-trigger initialization
    window.location.reload();
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-red-800 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">Connection Error</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="space-y-3">
              <Button onClick={retry} className="w-full bg-blue-900 text-blue-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => navigate('/meeting-demo')} 
                variant="outline" 
                className="w-full bg-gray-800 border-gray-600 text-gray-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Meeting Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="bg-black border-gray-800 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">🔗 Connecting...</h3>
            <p className="text-gray-400 mb-4">Joining your meeting</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Room: {roomId}</p>
              <p>As: {userInfo.role === 'doctor' ? `Dr. ${userInfo.name}` : userInfo.name}</p>
            </div>
            <Button 
              onClick={() => navigate('/meeting-demo')} 
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
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={() => navigate('/meeting-demo')}
          variant="outline"
          className="bg-black/80 border-gray-700 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Leave
        </Button>
      </div>

      {/* Meeting container */}
      <div 
        ref={containerRef}
        className="w-full h-screen bg-black"
      />
    </div>
  );
};

export default DirectJitsiMeeting;