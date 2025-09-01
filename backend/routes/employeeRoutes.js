import express from "express";
import dotenv from "dotenv";
import {
  getAllEmployees,
  getEmployeeById,
  loginEmployee,
} from "../controllers/employeeController.js";
import Employee from "../models/Employee.js";

dotenv.config();

const router = express.Router();
import jwt from "jsonwebtoken";

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await Employee.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ================== ROUTES ==================

// Public → Get all employees
router.get("/", getAllEmployees);

// Public → Employee login (returns token)
router.post("/login", loginEmployee);

// Protected → Get employee profile
router.get("/:id", protect, getEmployeeById);



export default router;
