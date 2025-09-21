import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
    phone: { type: String, required: true },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    profilePhoto: { type: String }, // just store filename if uploaded

    // Professional Details
    primarySpecialization: { type: String, required: true },
    secondarySpecialization: { type: String },
    licenseNumber: { type: String, required: true },
    licenseExpiry: { type: Date },
    qualifications: { type: String },
    experience: { type: Number, required: true },
    education: { type: String },
    certifications: { type: String },
    department: { type: String },
    position: { type: String, enum: ["Department Head", "Senior Doctor", "Specialist", "Resident", "Intern"] },
    
    // Status and Activity
    status: { type: String, enum: ["Active", "Inactive", "On Leave"], default: "Active" },
    patientCount: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    isAvailable: { type: Boolean, default: true },
    
    // Additional Professional Information
    consultationFee: { type: Number },
    workingHours: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String }
    },
    languages: [{ type: String }],
    aboutMe: { type: String },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
