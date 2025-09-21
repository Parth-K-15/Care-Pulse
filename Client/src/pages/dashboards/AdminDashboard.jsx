import { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import Dashboard from "../Admin/Dashboard";
import Doctors from "../Admin/Doctors";
import Patients from "../Admin/Patients";
import Appointments from "../Admin/Appointments";
import Prescriptions from "../Admin/Prescriptions";
import DepartmentList from "../Department/DepartmentList";
import DepartmentForm from "../Department/DepartmentForm";
import DoctorList from "../Doctor/DoctorList";
import DoctorForm from "../Doctor/DoctorForm";
import StaffList from "../Staff/StaffList";
import StaffForm from "../Staff/StaffForm";
import { Button } from "../../components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { Building2, Users, ChevronDown, UserCheck } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const [currentView, setCurrentView] = useState("dashboard");
  const [isDeptOpen, setIsDeptOpen] = useState(true);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  // Prefetch departments for DoctorForm dropdown
  useEffect(() => {
    fetch("http://localhost:5000/api/departments")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setDepartments(data))
      .catch(() => {});
  }, []);

  // Auth guard with Clerk to prevent redirect loops
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/admin" replace />;

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      navigate("/admin", { replace: true });
    }
  };

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "doctors", label: "Doctors", icon: "🩺" },
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "prescriptions", label: "Prescriptions", icon: "💊" },
  ];

  const renderPage = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "doctors":
        return <Doctors />;
      case "patients":
        return <Patients />;
      case "appointments":
        return <Appointments />;
      case "prescriptions":
        return <Prescriptions />;
      // Departments grouped views
      case "dept.list":
        return <DepartmentList />;
      case "dept.add":
        return <DepartmentForm />;
      // Doctors grouped views
      case "doc.list":
        return <DoctorList />;
      case "doc.add":
        return <DoctorForm departments={departments} onSave={() => setCurrentView("doc.list")} />;
      // Staff grouped views
      case "staff.list":
        return <StaffList />;
      case "staff.add":
        return <StaffForm onSave={() => setCurrentView("staff.list")} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
        <div className="min-h-screen bg-black flex">
          {/* Sidebar */}
          <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black border border-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏥</span>
                </div>
                <span className="text-white font-semibold text-lg">CarePulse Admin</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-3">
              <div className="mb-6">
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                  ⚙️ Admin Panel
                </h3>
                {adminMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full justify-start space-x-3 px-3 py-2.5 h-auto rounded-lg border transition-colors ${
                      currentView === item.id
                        ? "bg-black border-gray-600 text-white hover:bg-gray-900"
                        : "text-gray-400 hover:bg-gray-900 hover:text-white border-transparent hover:border-gray-700"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>

              {/* Departments Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsDeptOpen((v) => !v)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    currentView.startsWith("dept.") ? "bg-gray-800 text-white border-gray-600" : "text-gray-300 hover:bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🏢</span>
                    <span className="text-sm font-medium">Departments</span>
                  </span>
                  <span className={`text-sm transition-transform ${isDeptOpen ? "rotate-180" : ""}`}>🔽</span>
                </button>
                {isDeptOpen && (
                  <div className="ml-6 space-y-1 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("dept.list")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "dept.list" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      📋 Department List
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("dept.add")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "dept.add" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      ➕ Add Department
                    </Button>
                  </div>
                )}
              </div>

              {/* Doctors Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsDoctorOpen((v) => !v)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    currentView.startsWith("doc.") ? "bg-gray-800 text-white border-gray-600" : "text-gray-300 hover:bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">👨‍⚕️</span>
                    <span className="text-sm font-medium">Doctors</span>
                  </span>
                  <span className={`text-sm transition-transform ${isDoctorOpen ? "rotate-180" : ""}`}>🔽</span>
                </button>
                {isDoctorOpen && (
                  <div className="ml-6 space-y-1 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("doc.list")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "doc.list" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      📋 Doctors List
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("doc.add")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "doc.add" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      ➕ Add Doctor
                    </Button>
                  </div>
                )}
              </div>

              {/* Staff Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsStaffOpen((v) => !v)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    currentView.startsWith("staff.") ? "bg-gray-800 text-white border-gray-600" : "text-gray-300 hover:bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">👥</span>
                    <span className="text-sm font-medium">Staff</span>
                  </span>
                  <span className={`text-sm transition-transform ${isStaffOpen ? "rotate-180" : ""}`}>🔽</span>
                </button>
                {isStaffOpen && (
                  <div className="ml-6 space-y-1 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("staff.list")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "staff.list" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      📋 Staff List
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView("staff.add")}
                      className={`w-full justify-start px-3 py-2 h-auto text-sm rounded-md ${
                        currentView === "staff.add" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      ➕ Add Staff
                    </Button>
                  </div>
                )}
              </div>
            </nav>

            {/* User Profile / Actions */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white text-xs">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-sm font-medium truncate">🔐 Admin</p>
                    <p className="text-gray-400 text-xs">System Administrator</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950 rounded-lg" onClick={handleSignOut}>
                  🚪 Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-black">{renderPage()}</div>
        </div>
    </>
  );
}

