import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, index: true },
    username: { type: String, trim: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
    role: { type: String, enum: ["pending", "admin", "doctor", "patient"], default: "pending", index: true },
    approvedAt: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, clerkId: 1 });
userSchema.index({ role: 1, createdAt: -1 });

const User = mongoose.model("User", userSchema);
export default User;
