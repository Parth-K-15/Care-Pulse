import express from "express";
import Prescription from "../models/Prescription.js";

const router = express.Router();

// ✅ Create Prescription
router.post("/", async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json({ message: "Prescription created successfully", prescription });
  } catch (error) {
    res.status(500).json({ message: "Failed to create prescription", error: error.message });
  }
});

// ✅ Get All Prescriptions (with filters if needed)
router.get("/", async (req, res) => {
  try {
    const { patientId, doctorId, type } = req.query;
    let filter = {};

    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (type) filter.prescriptionType = type;

    const prescriptions = await Prescription.find(filter)
      .populate("doctorId", "firstName lastName email specialty")
      .populate("patientId", "firstName lastName email");
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescriptions", error: error.message });
  }
});

// ✅ Get Single Prescription
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("doctorId", "firstName lastName email specialty")
      .populate("patientId", "firstName lastName email");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescription", error: error.message });
  }
});

// ✅ Update Prescription
router.put("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription updated successfully", prescription });
  } catch (error) {
    res.status(500).json({ message: "Failed to update prescription", error: error.message });
  }
});

// ✅ Delete Prescription
router.delete("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete prescription", error: error.message });
  }
});

export default router;
