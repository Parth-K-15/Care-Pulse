import { useEffect, useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");


  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      // Sample data for display
      const sampleData = [
        {
          id: 1,
          name: "Dr. Sarah Wilson",
          specialty: "Cardiologist",
          email: "sarah.wilson@carepulse.com",
          phone: "+1 (555) 123-4567",
          address: "123 Medical Center Dr, Healthcare City, HC 12345",
          status: "Available",
          rating: 4.8,
          reviews: 124,
          patients: 247,
          experience: 8,
          avatar: "/api/placeholder/80/80"
        },
        {
          id: 2,
          name: "Dr. Michael Chen",
          specialty: "Neurosurgeon",
          email: "michael.chen@carepulse.com",
          phone: "+1 (555) 234-5678",
          address: "456 Hospital Ave, Medical District, MD 67890",
          status: "Available",
          rating: 4.9,
          reviews: 89,
          patients: 156,
          experience: 12,
          avatar: "/api/placeholder/80/80"
        },
        {
          id: 3,
          name: "Dr. Emily Rodriguez",
          specialty: "Pediatrician",
          email: "emily.rodriguez@carepulse.com",
          phone: "+1 (555) 345-6789",
          address: "789 Children's Way, Pediatric Plaza, PP 13579",
          status: "Busy",
          rating: 4.7,
          reviews: 203,
          patients: 312,
          experience: 6,
          avatar: "/api/placeholder/80/80"
        },
        {
          id: 4,
          name: "Dr. James Thompson",
          specialty: "Orthopedic Surgeon",
          email: "james.thompson@carepulse.com",
          phone: "+1 (555) 456-7890",
          address: "321 Bone & Joint Blvd, Orthopedic Center, OC 24680",
          status: "Available",
          rating: 4.6,
          reviews: 167,
          patients: 198,
          experience: 15,
          avatar: "/api/placeholder/80/80"
        }
      ];
      
      setDoctors(sampleData);
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





  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Doctors List</h1>
          <p className="text-gray-400">A list of all doctors in your clinic with their details.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black border border-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-black border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="bg-black border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="All">All Specialties</option>
                {uniqueSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 border border-gray-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                📥 Export
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No doctors found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      </div>


    </div>
  );
}