import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function DepartmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    headOfDepartment: "",
    location: "",
    status: "Active",
    contactEmail: "",
    contactPhone: "",
    description: "",
    assignedStaff: [],
    availableServices: [],
  });

  const services = [
    "General Consultation",
    "Preventive Care", 
    "Follow-up Visits",
    "Emergency Care",
    "Diagnostic Testing",
    "Specialized Treatment",
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Response:", data);
      alert("Department Added: " + (data.name || "No name returned"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Add Department</h1>
          <p className="text-gray-400 text-lg">Create a new department in your clinic</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
          <form className="space-y-12">
            
            {/* Department Information Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Department Information</h2>
                <p className="text-gray-400">Enter the details for the new department</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Department Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="e.g. Cardiology"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                  <p className="text-xs text-gray-500">The official name of the department</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Head of Department</label>
                  <Input
                    type="text"
                    name="headOfDepartment"
                    placeholder="Select a doctor"
                    value={formData.headOfDepartment}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                  <p className="text-xs text-gray-500">The doctor who will lead this department</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Location</label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="e.g. Building A, Floor 3"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                  <p className="text-xs text-gray-500">Physical location of the department</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Status</label>
                  <Select 
                    name="status"
                    value={formData.status}
                    onValueChange={(value) => handleChange({ target: { name: 'status', value } })}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Active" className="text-white hover:bg-gray-700">Active</SelectItem>
                      <SelectItem value="Inactive" className="text-white hover:bg-gray-700">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Current operational status</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Contact Email</label>
                  <Input
                    type="email"
                    name="contactEmail"
                    placeholder="department@clinic.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                  <p className="text-xs text-gray-500">Department contact email</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Contact Phone</label>
                  <Input
                    type="text"
                    name="contactPhone"
                    placeholder="(555) 123-4567"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                  <p className="text-xs text-gray-500">Department contact phone</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Description</h2>
                <p className="text-gray-400">Provide a description of the department's purpose, specialties, and functions...</p>
              </div>
              
              <div className="space-y-3">
                <Textarea
                  name="description"
                  placeholder="Provide a detailed description of the department's purpose, specialties, and functions..."
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500">Detailed description of the department</p>
              </div>
            </div>

            {/* Assign Staff Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Assign Staff</h2>
                <p className="text-gray-400">Select staff members to assign to this department</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Dr. Sarah Johnson", role: "Cardiologist" },
                  { name: "Dr. Michael Chen", role: "Neurologist" },
                  { name: "Dr. Emily Rodriguez", role: "Pediatrician" },
                  { name: "Nurse Robert Taylor", role: "Head Nurse" },
                  { name: "Nurse Jessica Adams", role: "Registered Nurse" },
                  { name: "Dr. James Wilson", role: "Orthopedic Surgeon" },
                ].map((staff) => (
                  <div key={staff.name} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <Checkbox
                      id={staff.name}
                      className="mt-1 border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={staff.name} className="text-sm font-medium text-white cursor-pointer block">
                        {staff.name}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">{staff.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Services Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Available Services</h2>
                <p className="text-gray-400">Select services that will be offered by this department</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <Checkbox
                      id={service}
                      checked={formData.availableServices.includes(service)}
                      onCheckedChange={(checked) => {
                        handleChange({
                          target: {
                            name: 'availableServices',
                            value: service,
                            type: 'checkbox',
                            checked,
                          },
                        });
                      }}
                      className="mt-1 border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={service} className="text-sm font-medium text-white cursor-pointer block">
                        {service}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        {service === 'General Consultation' && 'Initial patient assessment and diagnosis'}
                        {service === 'Preventive Care' && 'Health maintenance and disease prevention'}
                        {service === 'Follow-up Visits' && 'Post-treatment monitoring and care'}
                        {service === 'Emergency Care' && 'Urgent medical attention'}
                        {service === 'Diagnostic Testing' && 'Comprehensive tests and screenings'}
                        {service === 'Specialized Treatment' && 'Advanced procedures specific to department'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 flex justify-end">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 h-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-white hover:bg-gray-100 text-black font-semibold px-12 py-3 h-auto rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}