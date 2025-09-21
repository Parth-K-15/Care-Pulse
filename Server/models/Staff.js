// models/Staff.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // Personal Information
    photo: { type: String }, // store filename for now
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relation: { type: String },
    },

    // Professional Information
    profession: { type: String },
    specialization: { type: String },
    qualifications: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    licenses: [
      {
        type: String,
        number: String,
        issueDate: Date,
        expiryDate: Date,
        authority: String,
      },
    ],
    bio: { type: String },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;