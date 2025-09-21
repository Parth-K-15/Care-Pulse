import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Upsert user from Clerk payload
// POST /api/auth/sync
router.post("/sync", async (req, res) => {
  try {
    const { clerkId, email, username, firstName, lastName, imageUrl, role } = req.body;
    if (!clerkId || !email) {
      return res.status(400).json({ message: "clerkId and email are required" });
    }

    const update = {
      email,
      username,
      firstName,
      lastName,
      imageUrl,
      role: role || "pending", // Default to pending for new users
      lastLoginAt: new Date(),
    };

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: update, $setOnInsert: { clerkId } },
      { new: true, upsert: true }
    );

    res.json({ message: "User synced", user });
  } catch (err) {
    console.error("/api/auth/sync error:", err);
    res.status(500).json({ message: "Failed to sync user", error: err.message });
  }
});

// GET /api/auth/me?clerkId=...
router.get("/me", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) return res.status(400).json({ message: "clerkId is required" });
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all pending admin requests
// GET /api/auth/requests
router.get("/requests", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-__v");
    
    res.json({ 
      success: true, 
      users,
      count: users.length 
    });
  } catch (err) {
    console.error("/api/auth/requests error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch user requests", 
      error: err.message 
    });
  }
});

// Approve pending admin
// PATCH /api/auth/approve/:id
router.patch("/approve/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: "admin",
        approvedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User approved successfully",
      user
    });
  } catch (err) {
    console.error("/api/auth/approve error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to approve user",
      error: err.message
    });
  }
});

// Get pending requests count
// GET /api/auth/pending/count
router.get("/pending/count", async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "pending" });
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
