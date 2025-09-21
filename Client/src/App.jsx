import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Preloader from "./common/Preloader/Preloader";
import LandingPage from "./pages/LandingPage";
import AdminAuth from "./pages/Admin/AdminAuth";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ImageToText from "./components/ImageToText";
// ...existing code...

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
      <Route path="/ocr" element={<ImageToText />} />
  // ...existing code...
      {/* Future: doctor/patient auth routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
