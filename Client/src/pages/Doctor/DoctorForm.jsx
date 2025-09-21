// src/pages/Doctor/DoctorForm.jsx
import { useState } from "react";

const DoctorForm = ({ departments }) => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({
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

  const [professionalInfo, setProfessionalInfo] = useState({
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

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleCancel = () => {
    setStep(1);
    setPersonalInfo({});
    setProfessionalInfo({});
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...personalInfo, ...professionalInfo }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Doctor saved successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving doctor");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName || ""}
                onChange={handlePersonalChange}
                placeholder="Enter first name"
                className="input-field"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName || ""}
                onChange={handlePersonalChange}
                placeholder="Enter last name"
                className="input-field"
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={personalInfo.dob || ""}
                onChange={handlePersonalChange}
                className="input-field"
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={personalInfo.gender || ""}
                onChange={handlePersonalChange}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={personalInfo.address || ""}
                onChange={handlePersonalChange}
                placeholder="Enter address"
                className="input-field"
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={personalInfo.city || ""}
                onChange={handlePersonalChange}
                placeholder="Enter city"
                className="input-field"
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={personalInfo.state || ""}
                onChange={handlePersonalChange}
                placeholder="Enter state"
                className="input-field"
              />
            </div>
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={personalInfo.zip || ""}
                onChange={handlePersonalChange}
                placeholder="Enter zip code"
                className="input-field"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={personalInfo.email || ""}
                onChange={handlePersonalChange}
                placeholder="Enter email address"
                className="input-field"
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone || ""}
                onChange={handlePersonalChange}
                placeholder="Enter phone number"
                className="input-field"
              />
            </div>
            <div>
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={personalInfo.emergencyContactName || ""}
                onChange={handlePersonalChange}
                placeholder="Enter emergency contact name"
                className="input-field"
              />
            </div>
            <div>
              <label>Emergency Contact Phone</label>
              <input
                type="text"
                name="emergencyContactPhone"
                value={personalInfo.emergencyContactPhone || ""}
                onChange={handlePersonalChange}
                placeholder="Enter emergency contact phone"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label>Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handlePersonalChange}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Professional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Primary Specialization</label>
              <select
                name="primarySpecialization"
                value={professionalInfo.primarySpecialization || ""}
                onChange={handleProfessionalChange}
                className="input-field"
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
              <label>Secondary Specialization</label>
              <select
                name="secondarySpecialization"
                value={professionalInfo.secondarySpecialization || ""}
                onChange={handleProfessionalChange}
                className="input-field"
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
              <label>Medical License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={professionalInfo.licenseNumber || ""}
                onChange={handleProfessionalChange}
                placeholder="Enter license number"
                className="input-field"
              />
            </div>
            <div>
              <label>License Expiry Date</label>
              <input
                type="date"
                name="licenseExpiry"
                value={professionalInfo.licenseExpiry || ""}
                onChange={handleProfessionalChange}
                className="input-field"
              />
            </div>
            <div>
              <label>Qualifications</label>
              <input
                type="text"
                name="qualifications"
                value={professionalInfo.qualifications || ""}
                onChange={handleProfessionalChange}
                placeholder="Enter qualifications"
                className="input-field"
              />
            </div>
            <div>
              <label>Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={professionalInfo.experience || ""}
                onChange={handleProfessionalChange}
                placeholder="Enter years of experience"
                className="input-field"
              />
            </div>
            <div>
              <label>Education</label>
              <input
                type="text"
                name="education"
                value={professionalInfo.education || ""}
                onChange={handleProfessionalChange}
                placeholder="Enter education details"
                className="input-field"
              />
            </div>
            <div>
              <label>Certifications</label>
              <input
                type="text"
                name="certifications"
                value={professionalInfo.certifications || ""}
                onChange={handleProfessionalChange}
                placeholder="Enter certifications"
                className="input-field"
              />
            </div>
            <div>
              <label>Department</label>
              <select
                name="department"
                value={professionalInfo.department || ""}
                onChange={handleProfessionalChange}
                className="input-field"
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
              <label>Position</label>
              <select
                name="position"
                value={professionalInfo.position || ""}
                onChange={handleProfessionalChange}
                className="input-field"
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
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Doctor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorForm;
