import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Users } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Departments");
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [editingDept, setEditingDept] = useState(null); // Department being edited
  const [formData, setFormData] = useState({}); // For editing

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments");
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Filter departments based on search term and active filter
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.headOfDepartment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "Active") return matchesSearch && dept.status === "Active";
    if (activeFilter === "Inactive") return matchesSearch && dept.status === "Inactive";
    return matchesSearch;
  });

  const handleActionClick = (deptId, action) => {
    setOpenActionMenu(null);
    const dept = departments.find(d => d._id === deptId);
    
    switch (action) {
      case "view":
        console.log("View details for:", dept);
        // TODO: Implement view details modal or page
        break;
      case "edit":
        handleEditClick(dept);
        break;
      case "manage":
        console.log("Manage staff for:", dept);
        // TODO: Implement staff management modal or page
        break;
    }
  };

  const handleEditClick = (dept) => {
    setEditingDept(dept._id);
    setFormData({
      name: dept.name,
      headOfDepartment: dept.headOfDepartment,
      location: dept.location,
      status: dept.status,
      contactEmail: dept.contactEmail,
      contactPhone: dept.contactPhone,
      description: dept.description,
      assignedStaff: dept.assignedStaff || [],
      availableServices: dept.availableServices || [],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "availableServices") {
      setFormData((prev) => ({
        ...prev,
        availableServices: checked
          ? [...prev.availableServices, value]
          : prev.availableServices.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/departments/${editingDept}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Updated:", data);
      setEditingDept(null);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const services = [
    "General Consultation",
    "Preventive Care",
    "Follow-up Visits",
    "Emergency Care",
    "Diagnostic Testing",
    "Specialized Treatment",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Department List</h1>
          <p className="text-gray-400 text-lg">View and manage all departments in your clinic</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {["All Departments", "Active", "Inactive"].map((filter) => (
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
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Department Name</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Head of Department</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Staff Count</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Services</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  filteredDepartments.map((dept) => (
                    <tr key={dept._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-6 px-8 font-medium text-white">{dept.name}</td>
                      <td className="py-6 px-8 text-gray-300">{dept.headOfDepartment || "-"}</td>
                      <td className="py-6 px-8 text-gray-300">{dept.assignedStaff?.length || 0}</td>
                      <td className="py-6 px-8 text-gray-300">{dept.availableServices?.length || 0}</td>
                      <td className="py-6 px-8">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          dept.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {dept.status}
                        </span>
                      </td>
                      <td className="py-6 px-8 relative">
                        <button
                          onClick={() => setOpenActionMenu(openActionMenu === dept._id ? null : dept._id)}
                          className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Action Dropdown */}
                        {openActionMenu === dept._id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleActionClick(dept._id, "view")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View details
                              </button>
                              <button
                                onClick={() => handleActionClick(dept._id, "edit")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Edit department
                              </button>
                              <button
                                onClick={() => handleActionClick(dept._id, "manage")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Users className="w-4 h-4" />
                                Manage staff
                              </button>
                              <hr className="border-gray-200 my-1" />
                              <button
                                onClick={() => handleActionClick(dept._id, "deactivate")}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                              >
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

        {/* Edit Modal */}
        {editingDept && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm w-96 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-semibold text-white mb-6">Edit Department</h3>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Department Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Department Name"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Head of Department</label>
                  <input
                    type="text"
                    name="headOfDepartment"
                    value={formData.headOfDepartment}
                    onChange={handleChange}
                    placeholder="Head of Department"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white h-12 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Contact Email"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Contact Phone"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full bg-gray-800/50 border border-gray-700 p-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 min-h-[80px] resize-none"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Available Services</label>
                  <div className="grid grid-cols-1 gap-3 max-h-32 overflow-y-auto">
                    {services.map((service) => (
                      <label key={service} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50 transition-colors text-gray-300">
                        <input
                          type="checkbox"
                          name="availableServices"
                          value={service}
                          checked={formData.availableServices.includes(service)}
                          onChange={handleChange}
                          className="rounded border-gray-600"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 h-auto"
                    onClick={() => setEditingDept(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-3 h-auto rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

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
}