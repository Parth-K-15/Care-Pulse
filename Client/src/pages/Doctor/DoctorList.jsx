import { useEffect, useState } from "react";
import { Search, Filter, Download, MoreHorizontal, Eye, Edit, UserX } from "lucide-react";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.primarySpecialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || doctor.status === statusFilter;
    const matchesSpecialty = specialtyFilter === "All" || doctor.primarySpecialization === specialtyFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const uniqueSpecialties = [...new Set(doctors.map(doctor => doctor.primarySpecialization))];

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-green-100 text-green-800 border border-green-200",
      Inactive: "bg-red-100 text-red-800 border border-red-200",
      "On Leave": "bg-yellow-100 text-yellow-800 border border-yellow-200"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || styles.Inactive}`}>
        {status}
      </span>
    );
  };

  const handleActionClick = (doctorId, action) => {
    const doctor = doctors.find(d => d._id === doctorId);
    setSelectedDoctor(doctor);
    
    switch (action) {
      case 'view':
        setShowProfileModal(true);
        break;
      case 'edit':
        // Handle edit - could navigate to edit form
        console.log('Edit doctor:', doctorId);
        break;
      case 'deactivate':
        handleDeactivateDoctor(doctorId);
        break;
      default:
        break;
    }
    setShowActionsDropdown(null);
  };

  const handleDeactivateDoctor = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchDoctors(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };

  const ProfileModal = ({ doctor, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {doctor.profilePhoto ? (
                  <img src={doctor.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-gray-600">
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">Dr. {doctor.firstName} {doctor.lastName}</h3>
                <p className="text-gray-600">{doctor.primarySpecialization}</p>
                {getStatusBadge(doctor.status)}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {doctor.email}</p>
                <p><span className="font-medium">Phone:</span> {doctor.phone}</p>
                <p><span className="font-medium">Address:</span> {doctor.address}, {doctor.city}, {doctor.state} {doctor.zip}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Professional Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Experience:</span> {doctor.experience} years</p>
                <p><span className="font-medium">Department:</span> {doctor.department}</p>
                <p><span className="font-medium">Position:</span> {doctor.position}</p>
                <p><span className="font-medium">License:</span> {doctor.licenseNumber}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Education & Qualifications</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Education:</span> {doctor.education}</p>
                <p><span className="font-medium">Qualifications:</span> {doctor.qualifications}</p>
                <p><span className="font-medium">Certifications:</span> {doctor.certifications}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Additional Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Patients:</span> {doctor.patientCount || 0}</p>
                <p><span className="font-medium">Secondary Specialty:</span> {doctor.secondarySpecialization || 'None'}</p>
                <p><span className="font-medium">Emergency Contact:</span> {doctor.emergencyContactName} ({doctor.emergencyContactPhone})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Doctors List</h1>
          <p className="text-gray-400">A list of all doctors in your clinic with their details.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Specialties</option>
                {uniqueSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Specialty</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Patients</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Experience</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No doctors found.
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {doctor.profilePhoto ? (
                              <img src={doctor.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-sm font-medium text-gray-600">
                                {doctor.firstName[0]}{doctor.lastName[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Dr. {doctor.firstName} {doctor.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{doctor.primarySpecialization}</td>
                      <td className="py-4 px-6">{getStatusBadge(doctor.status)}</td>
                      <td className="py-4 px-6 text-gray-700">{doctor.patientCount || 0}</td>
                      <td className="py-4 px-6 text-gray-700">{doctor.experience} years</td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-900">{doctor.email}</p>
                          <p className="text-gray-500">{doctor.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionsDropdown(showActionsDropdown === doctor._id ? null : doctor._id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          {showActionsDropdown === doctor._id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleActionClick(doctor._id, 'view')}
                                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                              >
                                <Eye className="w-4 h-4" />
                                View Profile
                              </button>
                              <button
                                onClick={() => handleActionClick(doctor._id, 'edit')}
                                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleActionClick(doctor._id, 'deactivate')}
                                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                              >
                                <UserX className="w-4 h-4" />
                                Deactivate
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedDoctor && (
        <ProfileModal 
          doctor={selectedDoctor} 
          onClose={() => setShowProfileModal(false)} 
        />
      )}
    </div>
  );
}