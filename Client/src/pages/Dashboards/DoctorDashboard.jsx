import React, { useEffect, useState } from 'react';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, ClipboardList, FileText, LayoutDashboard, ListChecks, PackageSearch, Users } from 'lucide-react';
import DoctorHome from '../Doctor/DoctorHome';
import Appointments from '../Admin/Appointments';
import Prescriptions from '../Admin/Prescriptions';
import PatientTable from '../Patient/PatientTable';
import PatientForm from '../Patient/PatientForm';
import Inventory from '../Doctor/Inventory';

const DoctorDashboard = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isPatientsOpen, setIsPatientsOpen] = useState(false);

  // Sync user to backend on mount
  useEffect(() => {
    const sync = async () => {
      try {
        if (!user) return;
        const payload = {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          role: 'doctor',
        };
        await fetch('http://localhost:5000/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.warn('User sync failed:', e);
      }
    };
    sync();
  }, [user]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 opacity-80" /> },
    { id: 'appointments', label: 'Appointments', icon: <ClipboardList className="w-4 h-4 opacity-80" /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <FileText className="w-4 h-4 opacity-80" /> },
    { id: 'patients', label: 'Patients', icon: <Users className="w-4 h-4 opacity-80" /> },
    { id: 'inventory', label: 'Inventory', icon: <PackageSearch className="w-4 h-4 opacity-80" /> },
  ];

  const renderPage = () => {
    switch (currentView) {
      case 'dashboard':
        return <DoctorHome />;
      case 'appointments':
        return <Appointments />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'patients.list':
        return <PatientTable />;
      case 'patients.add':
        return <PatientForm onSave={() => setCurrentView('patients.list')} />;
      case 'inventory':
        return <Inventory />;
      default:
        return <DoctorHome />;
    }
  };

  return (
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
        <nav className="flex-1 p-4 space-y-3">
          <div className="mb-6">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Doctor Panel</h3>
            {menuItems.filter(m => m.id !== 'patients').map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-gray-800 text-sm ${
                  currentView === item.id ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Patients dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setIsPatientsOpen(v => !v)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md border border-gray-800 ${
                currentView.startsWith('patients.') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 opacity-80" />
                <span className="text-sm font-medium">Patients</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isPatientsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isPatientsOpen && (
              <div className="ml-6 space-y-1">
                <button
                  onClick={() => setCurrentView('patients.list')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    currentView === 'patients.list' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  View Patients
                </button>
                <button
                  onClick={() => setCurrentView('patients.add')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    currentView === 'patients.add' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  Add Patient
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">DR</div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm font-medium truncate">Doctor</p>
                <p className="text-gray-400 text-xs">Clinician</p>
              </div>
            </div>
            <Button variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black">{renderPage()}</div>
    </div>
  );
};

export default DoctorDashboard;