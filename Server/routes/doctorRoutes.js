import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// Create a new doctor
router.post("/", async (req, res) => {
  try {
    const doctorData = req.body;
    const doctor = await Doctor.create(doctorData);
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add doctor", error: error.message });
  }
});

// Get all doctors with optional filtering and search
router.get("/", async (req, res) => {
  try {
    const { search, specialty, status, department } = req.query;
    let filter = {};

    // Add search functionality
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { primarySpecialization: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (specialty) filter.primarySpecialization = specialty;
    if (status) filter.status = status;
    if (department) filter.department = department;

    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
});

// Get a single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
  }
});

// Update a doctor
router.put("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update doctor", error: error.message });
  }
});

// Delete/Deactivate a doctor
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "Inactive" },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deactivated successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to deactivate doctor", error: error.message });
  }
});

// Reactivate a doctor
router.patch("/:id/activate", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "Active" },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor activated successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to activate doctor", error: error.message });
  }
});

// Get doctors by specialty
router.get("/specialty/:specialty", async (req, res) => {
  try {
    const doctors = await Doctor.find({ 
      primarySpecialization: req.params.specialty,
      status: "Active"
    });
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors by specialty", error: error.message });
  }
});

// Get doctor statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const activeDoctors = await Doctor.countDocuments({ status: "Active" });
    const inactiveDoctors = await Doctor.countDocuments({ status: "Inactive" });
    const onLeaveDoctors = await Doctor.countDocuments({ status: "On Leave" });
    
    const specialties = await Doctor.distinct("primarySpecialization");
    
    const totalPatients = await Doctor.aggregate([
      { $group: { _id: null, total: { $sum: "$patientCount" } } }
    ]);

    res.json({
      totalDoctors,
      activeDoctors,
      inactiveDoctors,
      onLeaveDoctors,
      totalSpecialties: specialties.length,
      totalPatients: totalPatients[0]?.total || 0,
      specialties
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctor statistics", error: error.message });
  }
});

export default router;
