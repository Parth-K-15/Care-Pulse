import { useState, useEffect } from "react";
import DepartmentForm from "./pages/Department/DepartmentForm";
import DepartmentList from "./pages/Department/DepartmentList";
import Preloader from "./common/Preloader/Preloader";
import Dashboard from "./pages/Admin/Dashboard";
import Doctors from "./pages/Admin/Doctors";
import Patients from "./pages/Admin/Patients";
import Appointments from "./pages/Admin/Appointments";
import Prescriptions from "./pages/Admin/Prescriptions";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import { Button } from "./components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [userType, setUserType] = useState("admin"); // "admin", "patient", or "doctor"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "�" },
    { id: "doctors", label: "Doctors", icon: "�‍⚕️" },
    { id: "patients", label: "Patients", icon: "�" },
    { id: "appointments", label: "Appointments", icon: "�" },
    { id: "prescriptions", label: "Prescriptions", icon: "�" },
  ];

  const departmentMenuItems = [
    { id: "departments", label: "Departments", icon: "🏥" },
    { id: "addDepartment", label: "Add Department", icon: "➕" },
  ];

  const renderPage = () => {
    if (userType === "patient") {
      return <PatientDashboard onSwitchToAdmin={() => setUserType("admin")} />;
    }
    
    if (userType === "doctor") {
      return <DoctorDashboard 
        onSwitchToAdmin={() => setUserType("admin")} 
        onSwitchToPatient={() => setUserType("patient")} 
      />;
    }
    
    switch (currentView) {
      case "dashboard": return <Dashboard />;
      case "doctors": return <Doctors />;
      case "patients": return <Patients />;
      case "appointments": return <Appointments />;
      case "prescriptions": return <Prescriptions />;
      case "departments": return <DepartmentList />;
      case "addDepartment": return <DepartmentForm />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">CP</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">CarePulse</h1>
              <p className="text-gray-400 mb-8">Hospital Management System</p>
              
              {/* User Type Selection */}
              <div className="mb-6">
                <p className="text-gray-300 mb-4">Select your login type:</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    onClick={() => setUserType("admin")}
                    variant={userType === "admin" ? "default" : "outline"}
                    className={`${userType === "admin" 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    Admin
                  </Button>
                  <Button
                    onClick={() => setUserType("doctor")}
                    variant={userType === "doctor" ? "default" : "outline"}
                    className={`${userType === "doctor" 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    Doctor
                  </Button>
                  <Button
                    onClick={() => setUserType("patient")}
                    variant={userType === "patient" ? "default" : "outline"}
                    className={`${userType === "patient" 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    Patient
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    Sign In as {userType === "admin" ? "Admin" : userType === "doctor" ? "Doctor" : "Patient"}
                  </Button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 py-3">
                    Sign Up as {userType === "admin" ? "Admin" : userType === "doctor" ? "Doctor" : "Patient"}
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {userType === "patient" ? (
          // Patient View - Full Screen Dashboard
          <div className="min-h-screen bg-gray-950">
            {renderPage()}
          </div>
        ) : userType === "doctor" ? (
          // Doctor View - Full Screen Dashboard
          <div className="min-h-screen bg-gray-950">
            {renderPage()}
          </div>
        ) : (
          // Admin View - Sidebar Layout
          <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
              {/* Logo */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CP</span>
                  </div>
                  <span className="text-white font-semibold text-lg">CarePulse</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 p-4 space-y-1">
                <div className="mb-6">
                  <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Admin Panel</h3>
                  {adminMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full justify-start space-x-3 px-3 py-2.5 h-auto ${
                        currentView === item.id
                          ? 'bg-gray-800 text-white hover:bg-gray-800'
                          : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                      }`}
                    >
                      <span className="text-base opacity-70">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">System</h3>
                  {departmentMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full justify-start space-x-3 px-3 py-2.5 h-auto ${
                        currentView === item.id
                          ? 'bg-gray-800 text-white hover:bg-gray-800'
                          : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                      }`}
                    >
                      <span className="text-base opacity-70">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </nav>

              {/* User Profile with Clerk UserButton and User Type Switcher */}
              <div className="p-4 border-t border-gray-800 space-y-3">
                <div className="space-y-2">
                  <Button
                    onClick={() => setUserType("doctor")}
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Switch to Doctor View
                  </Button>
                  <Button
                    onClick={() => setUserType("patient")}
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Switch to Patient View
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "bg-gray-900 border-gray-800",
                          userButtonPopoverText: "text-gray-300"
                        }
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs">Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-black">
              {renderPage()}
            </div>
          </div>
        )}
      </SignedIn>
    </>
  );
}

export default App;
