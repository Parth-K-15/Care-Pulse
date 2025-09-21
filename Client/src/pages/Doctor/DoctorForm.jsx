// src/pages/Doctor/DoctorForm.jsx
import { useState } from "react";

const DoctorForm = ({ departments, onSave, initialData = null }) => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    dob: initialData?.dob || "",
    gender: initialData?.gender || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zip: initialData?.zip || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    emergencyContactName: initialData?.emergencyContactName || "",
    emergencyContactPhone: initialData?.emergencyContactPhone || "",
    profilePhoto: null,
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    primarySpecialization: initialData?.primarySpecialization || "",
    secondarySpecialization: initialData?.secondarySpecialization || "",
    licenseNumber: initialData?.licenseNumber || "",
    licenseExpiry: initialData?.licenseExpiry || "",
    qualifications: initialData?.qualifications || "",
    experience: initialData?.experience || "",
    education: initialData?.education || "",
    certifications: initialData?.certifications || "",
    department: initialData?.department || "",
    position: initialData?.position || "",
    status: initialData?.status || "Active",
    patientCount: initialData?.patientCount || 0,
    consultationFee: initialData?.consultationFee || "",
    languages: initialData?.languages || [],
    aboutMe: initialData?.aboutMe || "",
  });

  const handlePersonalChange = (e) => {
    const { name, value, files } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (e) => {
    const languages = e.target.value
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang);
    setProfessionalInfo((prev) => ({
      ...prev,
      languages,
    }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleCancel = () => {
    setStep(1);
    setPersonalInfo({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      profilePhoto: null,
    });
    setProfessionalInfo({
      primarySpecialization: "",
      secondarySpecialization: "",
      licenseNumber: "",
      licenseExpiry: "",
      qualifications: "",
      experience: "",
      education: "",
      certifications: "",
      department: "",
      position: "",
      status: "Active",
      patientCount: 0,
      consultationFee: "",
      languages: [],
      aboutMe: "",
    });
  };

  const handleSave = async () => {
    try {
      const doctorData = {
        ...personalInfo,
        ...professionalInfo,
        dob: personalInfo.dob ? new Date(personalInfo.dob) : null,
        licenseExpiry: professionalInfo.licenseExpiry
          ? new Date(professionalInfo.licenseExpiry)
          : null,
      };

      const url = initialData
        ? `http://localhost:5000/api/doctors/${initialData._id}`
        : "http://localhost:5000/api/doctors";

      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          initialData
            ? "Doctor updated successfully!"
            : "Doctor saved successfully!"
        );
        if (onSave) onSave();
        handleCancel(); // reset form
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving doctor");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-md">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
          </div>
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-2">
          <span className="text-sm text-gray-600">Personal Info</span>
          <span className="text-sm text-gray-600">Professional Details</span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalChange}
                placeholder="Enter first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalChange}
                placeholder="Enter last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={personalInfo.dob}
                onChange={handlePersonalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={personalInfo.address}
                onChange={handlePersonalChange}
                placeholder="Enter full address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={personalInfo.city}
                onChange={handlePersonalChange}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={personalInfo.state}
                onChange={handlePersonalChange}
                placeholder="Enter state"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="zip"
                value={personalInfo.zip}
                onChange={handlePersonalChange}
                placeholder="Enter zip code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={personalInfo.emergencyContactName}
                onChange={handlePersonalChange}
                placeholder="Enter emergency contact name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Phone
              </label>
              <input
                type="text"
                name="emergencyContactPhone"
                value={personalInfo.emergencyContactPhone}
                onChange={handlePersonalChange}
                placeholder="Enter emergency contact phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handlePersonalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Professional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Specialization *
              </label>
              <select
                name="primarySpecialization"
                value={professionalInfo.primarySpecialization}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select specialization</option>
                {[
                  "Cardiology",
                  "Neurology",
                  "Oncology",
                  "Dermatology",
                  "Orthopedics",
                  "Radiology",
                  "Gastroenterology",
                  "Nephrology",
                  "Ophthalmology",
                  "ENT",
                  "Pediatrics",
                  "Psychiatry",
                  "General Surgery",
                ].map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Specialization
              </label>
              <select
                name="secondarySpecialization"
                value={professionalInfo.secondarySpecialization}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select specialization</option>
                {[
                  "Cardiology",
                  "Neurology",
                  "Oncology",
                  "Dermatology",
                  "Orthopedics",
                  "Radiology",
                  "Gastroenterology",
                  "Nephrology",
                  "Ophthalmology",
                  "ENT",
                  "Pediatrics",
                  "Psychiatry",
                  "General Surgery",
                ].map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical License Number *
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={professionalInfo.licenseNumber}
                onChange={handleProfessionalChange}
                placeholder="Enter license number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Expiry Date
              </label>
              <input
                type="date"
                name="licenseExpiry"
                value={professionalInfo.licenseExpiry}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="number"
                name="experience"
                value={professionalInfo.experience}
                onChange={handleProfessionalChange}
                placeholder="Enter years of experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={professionalInfo.status}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={professionalInfo.department}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select department</option>
                {departments?.map((dept) => (
                  <option key={dept._id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                name="position"
                value={professionalInfo.position}
                onChange={handleProfessionalChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select position</option>
                {[
                  "Department Head",
                  "Senior Doctor",
                  "Specialist",
                  "Resident",
                  "Intern",
                ].map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Count
              </label>
              <input
                type="number"
                name="patientCount"
                value={professionalInfo.patientCount}
                onChange={handleProfessionalChange}
                placeholder="Current patient count"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee ($)
              </label>
              <input
                type="number"
                name="consultationFee"
                value={professionalInfo.consultationFee}
                onChange={handleProfessionalChange}
                placeholder="Enter consultation fee"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages (comma-separated)
              </label>
              <input
                type="text"
                name="languages"
                value={professionalInfo.languages.join(", ")}
                onChange={handleLanguageChange}
                placeholder="English, Spanish, French"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                value={professionalInfo.qualifications}
                onChange={handleProfessionalChange}
                placeholder="Enter qualifications"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <input
                type="text"
                name="education"
                value={professionalInfo.education}
                onChange={handleProfessionalChange}
                placeholder="Enter education details"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <input
                type="text"
                name="certifications"
                value={professionalInfo.certifications}
                onChange={handleProfessionalChange}
                placeholder="Enter certifications"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                name="aboutMe"
                value={professionalInfo.aboutMe}
                onChange={handleProfessionalChange}
                placeholder="Brief description about yourself and your practice"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {initialData ? "Update Doctor" : "Save Doctor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorForm;
