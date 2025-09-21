import { useEffect, useState } from "react";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
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
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Department Name</th>
              <th className="py-2 px-4 border">Head of Department</th>
              <th className="py-2 px-4 border">Staff Count</th>
              <th className="py-2 px-4 border">Services</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No departments found.
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept._id} className="text-center">
                  <td className="py-2 px-4 border">{dept.name}</td>
                  <td className="py-2 px-4 border">{dept.headOfDepartment || "-"}</td>
                  <td className="py-2 px-4 border">{dept.assignedStaff?.length || 0}</td>
                  <td className="py-2 px-4 border">{dept.availableServices?.join(", ")}</td>
                  <td className="py-2 px-4 border">{dept.status}</td>
                  <td className="py-2 px-4 border relative">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleEditClick(dept)}
                    >
                      ...
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">Edit Department</h3>
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Department Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="headOfDepartment"
                value={formData.headOfDepartment}
                onChange={handleChange}
                placeholder="Head of Department"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-2 rounded"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Contact Email"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Contact Phone"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              ></textarea>

              <div>
                <p className="font-semibold">Available Services</p>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availableServices"
                        value={service}
                        checked={formData.availableServices.includes(service)}
                        onChange={handleChange}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditingDept(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
