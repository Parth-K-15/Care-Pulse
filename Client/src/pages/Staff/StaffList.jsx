import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Users, UserX } from "lucide-react";
import { Button } from "../../components/ui/button";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Staff");
  const [openActionMenu, setOpenActionMenu] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/staff");
      const data = await res.json();
      setStaff(data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  // Filter staff based on search term and active filter
  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "Active") return matchesSearch && (member.status === "Active" || !member.status);
    if (activeFilter === "Inactive") return matchesSearch && member.status === "Inactive";
    return matchesSearch;
  });

  const handleActionClick = (staffId, action) => {
    setOpenActionMenu(null);
    const member = staff.find(s => s._id === staffId);
    
    switch (action) {
      case "view":
        console.log("View profile for:", member);
        // TODO: Implement view profile modal or page
        break;
      case "edit":
        console.log("Edit details for:", member);
        // TODO: Implement edit functionality
        break;
      case "deactivate":
        handleDeactivate(staffId);
        break;
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Inactive" }),
      });
      fetchStaff(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Staff List</h1>
          <p className="text-gray-400 text-lg">View and manage all staff members in your clinic</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {["All Staff", "Active", "Inactive"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-white text-black shadow-lg"
                  : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800/80 hover:border-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Name</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Role</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Specialization</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Contact</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Joined</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-500">
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((member) => (
                    <tr key={member._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-6 px-8 font-medium text-white">
                        {member.firstName} {member.lastName}
                      </td>
                      <td className="py-6 px-8 text-gray-300">{member.profession || "-"}</td>
                      <td className="py-6 px-8 text-gray-300">{member.specialization || "-"}</td>
                      <td className="py-6 px-8 text-gray-300">
                        <div className="space-y-1">
                          <div className="text-sm">{member.email}</div>
                          <div className="text-xs text-gray-500">{member.phone}</div>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-gray-300">
                        {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-6 px-8">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          (member.status === "Active" || !member.status)
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {member.status || "Active"}
                        </span>
                      </td>
                      <td className="py-6 px-8 relative">
                        <button
                          onClick={() => setOpenActionMenu(openActionMenu === member._id ? null : member._id)}
                          className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Action Dropdown */}
                        {openActionMenu === member._id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleActionClick(member._id, "view")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View profile
                              </button>
                              <button
                                onClick={() => handleActionClick(member._id, "edit")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Edit details
                              </button>
                              <hr className="border-gray-200 my-1" />
                              <button
                                onClick={() => handleActionClick(member._id, "deactivate")}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                              >
                                <UserX className="w-4 h-4" />
                                Deactivate
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Click outside to close action menu */}
        {openActionMenu && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setOpenActionMenu(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StaffList;
