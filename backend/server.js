import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import recognitionRoutes from "./routes/recognitionRoutes.js";

dotenv.config();
const app = express();


app.use(
  cors({
    origin: "https://credora-osit.onrender.com",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

connectDB();

app.use("/api/employees", employeeRoutes);
app.use("/api/recognitions", recognitionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Credora API is running...");
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
