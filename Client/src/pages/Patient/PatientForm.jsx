import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    status: initialData?.status || "",
    lastVisit: initialData?.lastVisit || "",
    condition: initialData?.condition || "",
    familyHistory: {
      diabetes: initialData?.familyHistory?.diabetes || false,
      heartDisease: initialData?.familyHistory?.heartDisease || false,
      hypertension: initialData?.familyHistory?.hypertension || false,
      cancer: initialData?.familyHistory?.cancer || false,
      asthma: initialData?.familyHistory?.asthma || false,
      mentalHealth: initialData?.familyHistory?.mentalHealth || false,
      notes: initialData?.familyHistory?.notes || "",
    },
    lifestyle: {
      smoking: initialData?.lifestyle?.smoking || "",
      alcohol: initialData?.lifestyle?.alcohol || "",
      exercise: initialData?.lifestyle?.exercise || "",
      diet: initialData?.lifestyle?.diet || "",
    },

    // Consent & Documents
    documents: [], // will hold { name, file } objects locally; mapped on submit
    hipaaConsent: null,
    treatmentConsent: null,
    financialAgreement: null,
    additionalDocType: "",
    additionalDocFile: null,
  });

  const handleChange = (e) => {
    const target = e.target || {};
    const { name, value, files, type, checked } = target;
    if (!name) return;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? !!checked : (files ? files[0] : value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? !!checked : (files ? files[0] : value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    delete dataToSend.photo; // not uploading files in this flow

    // Map document files to serializable objects
    const mappedDocs = [];
    if (Array.isArray(formData.documents)) {
      for (const d of formData.documents) {
        if (!d) continue;
        if (d.file) mappedDocs.push({ name: d.name || d.file.name, url: "" });
        else if (d.name) mappedDocs.push({ name: d.name, url: "" });
      }
    }
    // Include consent forms if provided
    if (formData.hipaaConsent) mappedDocs.push({ name: "HIPAA Consent", url: "" });
    if (formData.treatmentConsent) mappedDocs.push({ name: "Treatment Consent", url: "" });
    if (formData.financialAgreement) mappedDocs.push({ name: "Financial Agreement", url: "" });
    if (formData.additionalDocFile)
      mappedDocs.push({ name: formData.additionalDocType || formData.additionalDocFile.name, url: "" });
    dataToSend.documents = mappedDocs;

    // Coerce numeric fields
    if (dataToSend.height !== "") dataToSend.height = Number(dataToSend.height);
    if (dataToSend.weight !== "") dataToSend.weight = Number(dataToSend.weight);
    // Remove empty strings for enums without empty option
    if (dataToSend.gender === "") delete dataToSend.gender;
    if (dataToSend.status === "") delete dataToSend.status;
    if (dataToSend.dob === "") delete dataToSend.dob;
    if (dataToSend.lastVisit === "") delete dataToSend.lastVisit;

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
                  <Input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 h-12"
                  />
                </div>

                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <InputField label="Middle Name (Optional)" name="middleName" value={formData.middleName} onChange={handleChange} />
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

                {/* Gender Select */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Gender</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange({ target: { name: "gender", value } })}
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

                {/* Marital Status */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Marital Status</label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleChange({ target: { name: "maritalStatus", value } })}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="">Not specified</SelectItem>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Address Block */}
                <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
                <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
                <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />

                {/* Contact Information */}
                <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                <InputField label="Alternative Phone (Optional)" name="altPhone" value={formData.altPhone} onChange={handleChange} />
                <div className="space-y-3">
                  <label className="text-sm font-medium">Preferred Contact Method</label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) => handleChange({ target: { name: "contactMethod", value } })}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Phone">Phone</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emergency Contact */}
                <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
                  </div>
                  <InputField label="Contact Name" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} />
                  <InputField label="Relationship" name="emergencyContact.relation" value={formData.emergencyContact.relation} onChange={handleChange} />
                  <InputField label="Phone Number" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange} />
                  <InputField label="Email (Optional)" name="emergencyContact.email" value={formData.emergencyContact.email} onChange={handleChange} type="email" />
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
                {/* Blood Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleChange({ target: { name: "bloodType", value } })}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="">Not specified</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <InputField label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} />
                <InputField label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
              </div>

              <Textarea
                name="allergies"
                placeholder="List any allergies..."
                value={formData.allergies}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />

              <Textarea
                name="medications"
                placeholder="List any current medications"
                value={formData.medications}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />

              <Textarea
                name="chronicConditions"
                placeholder="List any chronic conditions"
                value={formData.chronicConditions}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputField label="Last Visit" name="lastVisit" type="date" value={formData.lastVisit} onChange={handleChange} />
                <InputField label="Primary Condition" name="condition" value={formData.condition} onChange={handleChange} />
              </div>

              <Textarea
                name="pastSurgeries"
                placeholder="List any past surgeries with dates"
                value={formData.pastSurgeries}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />

              <Textarea
                name="hospitalizations"
                placeholder="List any previous hospitalizations with dates"
                value={formData.hospitalizations}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white"
              />

              {/* Status */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange({ target: { name: "status", value } })}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                    <SelectValue placeholder="Select patient status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="">Not specified</SelectItem>
                    <SelectItem value="Admitted">Admitted</SelectItem>
                    <SelectItem value="Discharged">Discharged</SelectItem>
                    <SelectItem value="Under Observation">Under Observation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Family Medical History */}
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-2">
                  <h3 className="text-lg font-semibold">Family Medical History</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "diabetes", label: "Diabetes" },
                    { key: "heartDisease", label: "Heart Disease" },
                    { key: "hypertension", label: "Hypertension" },
                    { key: "cancer", label: "Cancer" },
                    { key: "asthma", label: "Asthma" },
                    { key: "mentalHealth", label: "Mental Health Conditions" },
                  ].map((fh) => (
                    <label key={fh.key} className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        name={`familyHistory.${fh.key}`}
                        checked={!!formData.familyHistory[fh.key]}
                        onChange={handleChange}
                        className="rounded border-gray-700 bg-gray-800"
                      />
                      {fh.label}
                    </label>
                  ))}
                </div>
                <Textarea
                  name="familyHistory.notes"
                  placeholder="Enter any additional family medical history"
                  value={formData.familyHistory.notes}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>

              {/* Lifestyle */}
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-2">
                  <h3 className="text-lg font-semibold">Lifestyle Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Smoking Status</label>
                    <Select
                      value={formData.lifestyle.smoking}
                      onValueChange={(value) => handleChange({ target: { name: "lifestyle.smoking", value } })}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Not specified</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Occasionally">Occasionally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Alcohol Consumption</label>
                    <Select
                      value={formData.lifestyle.alcohol}
                      onValueChange={(value) => handleChange({ target: { name: "lifestyle.alcohol", value } })}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                        <SelectValue placeholder="Select consumption" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="">Not specified</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Occasionally">Occasionally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <InputField label="Exercise Frequency" name="lifestyle.exercise" value={formData.lifestyle.exercise} onChange={handleChange} />
                  <Textarea
                    name="lifestyle.diet"
                    placeholder="Describe dietary habits"
                    value={formData.lifestyle.diet}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Section: Consent & Documents */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold">Consent & Documents</h2>
                <p className="text-gray-400">Upload required documents</p>
              </div>

              {/* Required Consent Forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium">HIPAA Consent Form</p>
                  <p className="text-gray-500 text-xs">Patient consent for use and disclosure of health information</p>
                  <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleChange({ target: { name: "hipaaConsent", files: e.target.files } })} />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium">Treatment Consent</p>
                  <p className="text-gray-500 text-xs">Consent to receive medical treatment</p>
                  <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleChange({ target: { name: "treatmentConsent", files: e.target.files } })} />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium">Financial Agreement</p>
                  <p className="text-gray-500 text-xs">Agreement to pay for services</p>
                  <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleChange({ target: { name: "financialAgreement", files: e.target.files } })} />
                </div>
              </div>

              {/* Additional Documents */}
              <div className="space-y-3 mt-4">
                <p className="text-gray-300 text-sm font-medium">Additional Documents</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Document Type (e.g., Insurance Card)"
                    value={formData.additionalDocType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalDocType: e.target.value }))}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalDocFile: e.target.files?.[0] || null }))}
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                    onClick={() => {
                      if (!formData.additionalDocFile) return;
                      setFormData((prev) => ({
                        ...prev,
                        documents: [
                          ...prev.documents,
                          { name: prev.additionalDocType || prev.additionalDocFile.name, file: prev.additionalDocFile },
                        ],
                        additionalDocType: "",
                        additionalDocFile: null,
                      }));
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" className="border-gray-700 text-gray-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-white text-black font-semibold">
                  Save Patient
                </Button>
              </div>
            </div>
          </form>
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