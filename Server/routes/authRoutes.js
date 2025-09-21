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
      lastLoginAt: new Date(),
    };
    if (role) update.role = role;

    // Note: Avoid specifying the same path (e.g., 'role') in both $set and $setOnInsert to prevent
    // MongoDB conflict errors like: "Updating the path 'role' would create a conflict at 'role'".
    // On upsert, fields in $set apply to inserts as well, and equality fields from the filter (clerkId)
    // are included in the inserted doc, so we only need clerkId in $setOnInsert.
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

export default router;
