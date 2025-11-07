import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import hallRoutes from "./routes/hallRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
