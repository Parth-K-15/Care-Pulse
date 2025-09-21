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
import { Checkbox } from "@/components/ui/checkbox";

const specializations = [
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
];

const StaffForm = ({ onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    photo: initialData?.photo || null,
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    dob: initialData?.dob || "",
    gender: initialData?.gender || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    postalCode: initialData?.postalCode || "",
    country: initialData?.country || "",
    emergencyContact: {
      name: initialData?.emergencyContact?.name || "",
      phone: initialData?.emergencyContact?.phone || "",
      relation: initialData?.emergencyContact?.relation || "",
    },
    // Professional Information
    profession: initialData?.profession || "",
    specialization: initialData?.specialization || "",
    qualifications: initialData?.qualifications || [
      { degree: "", institution: "", year: "" },
    ],
    licenses: initialData?.licenses || [
      { type: "", number: "", issueDate: "", expiryDate: "", authority: "" },
    ],
    bio: initialData?.bio || "",
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

  const handleQualificationChange = (index, field, value) => {
    const updated = [...formData.qualifications];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, qualifications: updated }));
  };

  const handleLicenseChange = (index, field, value) => {
    const updated = [...formData.licenses];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, licenses: updated }));
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { degree: "", institution: "", year: "" },
      ],
    }));
  };

  const addLicense = () => {
    setFormData((prev) => ({
      ...prev,
      licenses: [
        ...prev.licenses,
        { type: "", number: "", issueDate: "", expiryDate: "", authority: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData instance
    const formDataToSend = new FormData();

    // Append all fields
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("postalCode", formData.postalCode);
    formDataToSend.append("country", formData.country);

    // Emergency Contact (nested object)
    formDataToSend.append(
      "emergencyContact[name]",
      formData.emergencyContact.name
    );
    formDataToSend.append(
      "emergencyContact[phone]",
      formData.emergencyContact.phone
    );
    formDataToSend.append(
      "emergencyContact[relation]",
      formData.emergencyContact.relation
    );

    // Professional info
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("specialization", formData.specialization);
    formDataToSend.append("bio", formData.bio);

    // Append arrays as JSON strings
    formDataToSend.append(
      "qualifications",
      JSON.stringify(formData.qualifications)
    );
    formDataToSend.append("licenses", JSON.stringify(formData.licenses));

    // Append photo file if exists
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        body: formDataToSend, // no Content-Type header needed; browser sets it automatically
      });

      const data = await response.json();
      console.log("Staff added:", data);
      if (onSave) onSave(data);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Add Staff Member
          </h1>
          <p className="text-gray-400 text-lg">
            Create a new staff member profile in your clinic
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Personal Information
                </h2>
                <p className="text-gray-400">
                  Enter the personal details for the staff member
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-2 space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Profile Photo
                  </label>
                  <Input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 h-12"
                  />
                  <p className="text-xs text-gray-500">
                    Upload a profile photo for the staff member
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "gender", value } })
                    }
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="Male"
                        className="text-white hover:bg-gray-700"
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        value="Female"
                        className="text-white hover:bg-gray-700"
                      >
                        Female
                      </SelectItem>
                      <SelectItem
                        value="Other"
                        className="text-white hover:bg-gray-700"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="staff@clinic.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    State/Province
                  </label>
                  <Input
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Country
                  </label>
                  <Input
                    type="text"
                    name="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Emergency Contact
                </h2>
                <p className="text-gray-400">
                  Emergency contact information for the staff member
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Contact Name
                  </label>
                  <Input
                    type="text"
                    name="emergencyContact.name"
                    placeholder="Jane Doe"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Contact Phone
                  </label>
                  <Input
                    type="text"
                    name="emergencyContact.phone"
                    placeholder="(555) 987-6543"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Relationship
                  </label>
                  <Input
                    type="text"
                    name="emergencyContact.relation"
                    placeholder="Spouse"
                    value={formData.emergencyContact.relation}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Professional Information
                </h2>
                <p className="text-gray-400">
                  Enter the professional details and qualifications
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Profession
                  </label>
                  <Input
                    type="text"
                    name="profession"
                    placeholder="e.g. Registered Nurse"
                    value={formData.profession}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Specialization
                  </label>
                  <Select
                    name="specialization"
                    value={formData.specialization}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "specialization", value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white h-12">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {specializations.map((spec) => (
                        <SelectItem
                          key={spec}
                          value={spec}
                          className="text-white hover:bg-gray-700"
                        >
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Qualifications & Degrees
                </h2>
                <p className="text-gray-400">
                  Add educational qualifications and certifications
                </p>
              </div>

              <div className="space-y-6">
                {formData.qualifications.map((qualification, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-lg bg-gray-800/30 border border-gray-700"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Degree
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Bachelor of Science in Nursing"
                        value={qualification.degree}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Institution
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. University of Medicine"
                        value={qualification.institution}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Year Completed
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. 2020"
                        value={qualification.year}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "year",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addQualification}
                  variant="outline"
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Add Another Qualification
                </Button>
              </div>
            </div>

            {/* Licenses Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Licenses & Certifications
                </h2>
                <p className="text-gray-400">
                  Add professional licenses and certifications
                </p>
              </div>

              <div className="space-y-6">
                {formData.licenses.map((license, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 rounded-lg bg-gray-800/30 border border-gray-700"
                  >
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        License Type
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. RN License"
                        value={license.type}
                        onChange={(e) =>
                          handleLicenseChange(index, "type", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        License Number
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. RN123456"
                        value={license.number}
                        onChange={(e) =>
                          handleLicenseChange(index, "number", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Issue Date
                      </label>
                      <Input
                        type="date"
                        value={license.issueDate}
                        onChange={(e) =>
                          handleLicenseChange(
                            index,
                            "issueDate",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Expiry Date
                      </label>
                      <Input
                        type="date"
                        value={license.expiryDate}
                        onChange={(e) =>
                          handleLicenseChange(
                            index,
                            "expiryDate",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">
                        Issuing Authority
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. State Board"
                        value={license.authority}
                        onChange={(e) =>
                          handleLicenseChange(
                            index,
                            "authority",
                            e.target.value
                          )
                        }
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 h-12"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addLicense}
                  variant="outline"
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Add Another License
                </Button>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-8">
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Professional Bio
                </h2>
                <p className="text-gray-400">
                  Provide a brief professional biography
                </p>
              </div>

              <div className="space-y-3">
                <Textarea
                  name="bio"
                  placeholder="Write a brief professional biography highlighting experience, expertise, and achievements..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500">
                  Professional background and experience summary
                </p>
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
              Save Staff Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
