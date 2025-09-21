import { useState, useEffect } from "react";
import DepartmentForm from "./pages/Department/DepartmentForm";
import DepartmentList from "./pages/Department/DepartmentList";
import Preloader from "./common/Preloader/Preloader";
import DoctorForm from "./pages/Doctor/DoctorForm";
import DoctorList from "./pages/Doctor/DoctorList";
import LandingPage from "./pages/LandingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with actual API fetch if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds preloader
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Show preloader while loading
    return <Preloader />;
  }

  return (
    <>
      <LandingPage />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
        <DepartmentForm />
        <DepartmentList />
      </div>
      <DoctorList />
      <DoctorForm />
    </>
  );
}

export default App;
