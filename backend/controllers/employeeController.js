import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Helper: Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =========================
// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
// =========================
export const getAllEmployees = async (req, res) => {
  try {
    // ✅ Fetch only safe fields
    const employees = await Employee.find({}, "name email photo team");
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

// =========================
// @desc    Login employee (JWT Auth)
// @route   POST /api/employees/login
// @access  Public
// =========================
export const loginEmployee = async (req, res) => {
  try {
    let { email, password } = req.body;

    // normalize email
    email = email.toLowerCase();

    console.log("Login attempt:", email, password);

    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const safeEmployee = employee.toObject();
    delete safeEmployee.password;

    res.status(200).json({
      message: "✅ Login successful",
      token,
      employee: safeEmployee,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};


// =========================
// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private (JWT Protected)
// =========================
export const getEmployeeById = async (req, res) => {
  try {
    // ✅ Never return password
    const employee = await Employee.findById(req.params.id).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error fetching employee" });
  }
};
