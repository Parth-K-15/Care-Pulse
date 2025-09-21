import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientForm = ({ onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    photo: initialData?.photo || null,
    firstName: initialData?.firstName || "",
    middleName: initialData?.middleName || "",
    lastName: initialData?.lastName || "",
    dob: initialData?.dob || "",
    gender: initialData?.gender || "",
    maritalStatus: initialData?.maritalStatus || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    altPhone: initialData?.altPhone || "",
    contactMethod: initialData?.contactMethod || "Phone",
    emergencyContact: {
      name: initialData?.emergencyContact?.name || "",
      relation: initialData?.emergencyContact?.relation || "",
      phone: initialData?.emergencyContact?.phone || "",
      email: initialData?.emergencyContact?.email || "",
    },

    // Medical Information
    bloodType: initialData?.bloodType || "",
    height: initialData?.height || "",
    weight: initialData?.weight || "",
    allergies: initialData?.allergies || "",
    medications: initialData?.medications || "",
    chronicConditions: initialData?.chronicConditions || "",
    pastSurgeries: initialData?.pastSurgeries || "",
    hospitalizations: initialData?.hospitalizations || "",
    familyHistory: {
      diabetes: false,
      heartDisease: false,
      hypertension: false,
      cancer: false,
      asthma: false,
      mentalHealth: false,
      notes: "",
    },
    lifestyle: {
      smoking: "",
      alcohol: "",
      exercise: "",
      diet: "",
    },

    // Consent & Documents
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    delete dataToSend.photo;

    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add patient");
      }

      const data = await response.json();
      if (onSave) onSave(data);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Add Patient</h1>
          <p className="text-gray-400 text-lg">
            Create a new patient profile in your system
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
          <form className="space-y-12" onSubmit={handleSubmit}>
            
            {/* Section: Personal Information */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <p className="text-gray-400">Enter the patient’s personal details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Photo */}
                <div className="lg:col-span-2 space-y-3">
                  <label className="text-sm font-medium">Profile Photo</label>
                  <Input type="file" name="photo" accept="image/*" onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 h-12"
                  />
                </div>

                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <InputField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

                {/* Gender Select */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Gender</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "gender", value } })
                    }
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section: Medical Information */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold">Medical Information</h2>
                <p className="text-gray-400">Enter the patient’s medical details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputField label="Blood Type" name="bloodType" value={formData.bloodType} onChange={handleChange} />
                <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
              </div>
              <Textarea
                name="allergies"
                placeholder="List any allergies..."
                value={formData.allergies}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>

            {/* Section: Consent & Documents */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold">Consent & Documents</h2>
                <p className="text-gray-400">Upload required documents</p>
              </div>

              <div className="space-y-3">
                <Input type="file" multiple accept=".pdf,.jpg,.png" onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    documents: Array.from(e.target.files),
                  }));
                }} />
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 flex justify-end space-x-4">
          <Button variant="outline" className="border-gray-700 text-gray-300">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-white text-black font-semibold">
            Save Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

/* Small reusable input field */
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-sm font-medium">{label}</label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 h-12"
    />
  </div>
);

export default PatientForm;