import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // React frontend (multiple ports)
    methods: ["GET", "POST", "PUT", "DELETE"],
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
