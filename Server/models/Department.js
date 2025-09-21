import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    headOfDepartment: { type: String, required: false }, // <-- just store name
    location: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    contactEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    contactPhone: { type: String, required: true },
    description: { type: String },
    assignedStaff: [{ type: String }], // <-- array of names
    availableServices: [
      {
        type: String,
        enum: [
          "General Consultation",
          "Preventive Care",
          "Follow-up Visits",
          "Emergency Care",
          "Diagnostic Testing",
          "Specialized Treatment",
          "Other",
        ],
      },
    ],
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
