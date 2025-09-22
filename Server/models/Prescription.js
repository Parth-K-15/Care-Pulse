import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Medication name
  dosage: { type: String, required: true },        // e.g., "500mg"
  route: { type: String, default: "Oral" },        // Oral, IV, IM, etc.
  frequency: { type: String, required: true },     // e.g., "Twice daily"
  duration: { type: Number, required: true },      // Number of days
  specialInstructions: { type: String },           // Optional notes
  allowRefills: { type: Boolean, default: false },
  numberOfRefills: { type: Number, default: 0 }
});

const prescriptionSchema = new mongoose.Schema({
  prescriptionDate: { type: Date, default: Date.now },
  prescriptionType: { type: String, default: "Standard" },
  diagnosis: { type: String, required: true },
  templateUsed: { type: String },                   // If a template was used
  medications: [medicationSchema],                  // Array of medications
  notesForPharmacist: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },   // Who prescribed
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }  // To whom
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
