import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

// @desc Create new department
// @route POST /api/departments
router.post("/", async (req, res) => {
  try {
    const department = new Department(req.body);
    const savedDepartment = await department.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all departments
// @route GET /api/departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("headOfDepartment", "name")
      .populate("assignedStaff", "name");
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update department
// @route PUT /api/departments/:id
router.put("/:id", async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;