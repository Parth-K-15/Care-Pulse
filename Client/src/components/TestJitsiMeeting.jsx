import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TestJitsiMeeting = ({ roomName = 'test-room', displayName = 'Test User' }) => {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState('initializing');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('TestJitsiMeeting: Starting initialization');
    console.log('Container ref:', containerRef.current);
    
    const initJitsi = async () => {
      try {
        // Wait for container to be ready
        let attempts = 0;
        while (!containerRef.current && attempts < 10) {
          console.log(`Waiting for container... attempt ${attempts + 1}`);
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!containerRef.current) {
          throw new Error('Container element not found after 10 attempts');
        }

        console.log('Container is ready:', containerRef.current);
        setStatus('loading-api');

        // Load Jitsi API if not already loaded
        if (!window.JitsiMeetExternalAPI) {
          console.log('Loading Jitsi API...');
          await loadJitsiScript();
        }

        console.log('Jitsi API available:', !!window.JitsiMeetExternalAPI);
        setStatus('creating-meeting');

        // Create meeting
        const options = {
          roomName: `test-${roomName}`,
          width: '100%',
          height: '500px',
          parentNode: containerRef.current,
          configOverwrite: {
            enableWelcomePage: false,
            prejoinPageEnabled: false,
          },
          userInfo: {
            displayName: displayName,
          },
        };

        console.log('Creating Jitsi meeting with options:', options);
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);
        
        console.log('Jitsi meeting created successfully');
        setStatus('connected');

        // Add event listeners
        apiRef.current.addEventListeners({
          videoConferenceJoined: () => {
            console.log('Meeting joined');
            setStatus('joined');
          },
          readyToClose: () => {
            console.log('Meeting ended');
            if (apiRef.current) {
              apiRef.current.dispose();
              apiRef.current = null;
            }
            navigate(-1);
          }
        });

      } catch (err) {
        console.error('Failed to initialize Jitsi:', err);
        setError(err.message);
        setStatus('error');
      }
    };

    initJitsi();

    return () => {
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (err) {
          console.error('Error disposing Jitsi API:', err);
        }
        apiRef.current = null;
      }
    };
  }, [roomName, displayName, navigate]);

  const loadJitsiScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => {
        console.log('Jitsi script loaded successfully');
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Jitsi script'));
      };
      document.head.appendChild(script);
    });
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'initializing': return '🔄 Initializing...';
      case 'loading-api': return '📡 Loading Jitsi API...';
      case 'creating-meeting': return '🏗️ Creating meeting room...';
      case 'connected': return '✅ Connected to meeting';
      case 'joined': return '🎉 Successfully joined!';
      case 'error': return '❌ Connection failed';
      default: return '⏳ Setting up...';
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Card className="bg-black border-red-800 p-8 max-w-md">
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Meeting Error</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button
              onClick={() => navigate(-1)}
              className="bg-blue-900 text-blue-300 border-blue-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Status Header */}
      <div className="p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white font-semibold">Test Jitsi Meeting</h2>
            <p className="text-gray-400 text-sm">
              Room: {roomName} | User: {displayName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-400 text-sm">{getStatusMessage()}</p>
            <Button
              onClick={() => navigate(-1)}
              size="sm"
              className="mt-2 bg-gray-800 text-gray-300"
            >
              Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Meeting Container */}
      <div className="p-4">
        <div 
          ref={containerRef}
          id="test-jitsi-container"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg"
          style={{ height: '500px' }}
        >
          {status !== 'connected' && status !== 'joined' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">{getStatusMessage()}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-white font-medium mb-2">Debug Information</h3>
        <div className="text-sm text-gray-400 space-y-1">
          <p>Status: {status}</p>
          <p>Container Ready: {containerRef.current ? '✅' : '❌'}</p>
          <p>Jitsi API Available: {window.JitsiMeetExternalAPI ? '✅' : '❌'}</p>
          <p>API Instance: {apiRef.current ? '✅' : '❌'}</p>
        </div>
      </div>
    </div>
  );
};

export default TestJitsiMeeting;