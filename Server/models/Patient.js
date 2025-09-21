import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    // Personal Information
    photo: { type: String }, // store file path or URL
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    maritalStatus: {
      type: String,
      enum: ["", "Single", "Married", "Divorced", "Widowed", "Other"],
      default: "",
    },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String },
    altPhone: { type: String },
    contactMethod: {
      type: String,
      enum: ["Phone", "Email", "SMS"],
      default: "Phone",
    },
    status: {
      type: String,
      enum: ["Admitted", "Discharged", "Under Observation"],
      default: "Under Observation",
    },
    lastVisit: { type: Date },
    condition: { type: String }, // e.g., "Diabetes", "Flu", "Hypertension"
    doctor: { type: String }, // could also be ObjectId ref to Doctor model

    emergencyContact: {
      name: { type: String },
      relation: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    // Medical Information
    bloodType: {
      type: String,
      enum: ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      default: "",
    },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    allergies: { type: String },
    medications: { type: String },
    chronicConditions: { type: String },
    pastSurgeries: { type: String },
    hospitalizations: { type: String },

    familyHistory: {
      diabetes: { type: Boolean, default: false },
      heartDisease: { type: Boolean, default: false },
      hypertension: { type: Boolean, default: false },
      cancer: { type: Boolean, default: false },
      asthma: { type: Boolean, default: false },
      mentalHealth: { type: Boolean, default: false },
      notes: { type: String },
    },

    lifestyle: {
      smoking: {
        type: String,
        enum: ["", "Yes", "No", "Occasionally"],
        default: "",
      },
      alcohol: {
        type: String,
        enum: ["", "Yes", "No", "Occasionally"],
        default: "",
      },
      exercise: { type: String, default: "" },
      diet: { type: String, default: "" },
    },

    // Consent & Documents
    documents: [
      {
        name: { type: String },
        url: { type: String }, // path to uploaded file
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
