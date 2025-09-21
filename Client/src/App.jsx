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
      <Route path="/patient" element={<PatientAuth />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      {/* Future: doctor/patient auth routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;