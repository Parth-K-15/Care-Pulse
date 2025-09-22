import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Preloader from "./common/Preloader/Preloader";
import LandingPage from "./pages/LandingPage";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DoctorAuth from "./pages/Doctor/DoctorAuth";
import DoctorDashboard from "./pages/Dashboards/DoctorDashboard";
import PatientAuth from "./pages/Patient/PatientAuth";
import PatientDashboard from "./pages/Dashboards/PatientDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import MeetingRoom from "./components/MeetingRoom";
import { TestMeetingPage } from "./components/SimpleJitsiMeeting";
import MinimalJitsiMeeting from './components/MinimalJitsiMeeting';
import DirectJitsiMeeting from './components/DirectJitsiMeeting';
import SharedMeetingDemo from "./components/SharedMeetingDemo";
import AuthenticatedMeetingDemo from "./components/AuthenticatedMeetingDemo";
import TestJitsiMeeting from "./components/TestJitsiMeeting";
import JoinMeetingPage from "./components/JoinMeetingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/doctor" element={<DoctorAuth />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
      <Route path="/patient" element={<PatientAuth />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/join-meeting" element={<JoinMeetingPage />} />
      <Route path="/meeting/:roomId" element={<MeetingRoom />} />
      <Route path="/test-meeting/:roomId?" element={<TestMeetingPage />} />
      <Route path="/minimal-meeting/:roomId?" element={<MinimalJitsiMeeting />} />
      <Route path="/direct-meeting/:roomId" element={<DirectJitsiMeeting />} />
      <Route path="/debug-meeting/:roomId?" element={<TestJitsiMeeting />} />
      <Route path="/meeting-demo" element={<AuthenticatedMeetingDemo />} />
      <Route path="/meeting-demo-old" element={<SharedMeetingDemo />} />
      {/* Future: doctor/patient auth routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;