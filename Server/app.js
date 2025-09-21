import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Clerk-Session-Id",
      "Clerk-Redirect-Url"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Department routes
app.use("/api/departments", departmentRoutes);
// Doctor routes
app.use("/api/doctors", doctorRoutes);
// Auth/User routes
app.use("/api/auth", authRoutes);

app.use("/api/staff", staffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
