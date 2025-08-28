import Employee from "../models/Employee.js";

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, "name email photo team"); // ✅ Fetch only needed fields
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees", error });
  }
};

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Simple password check
    if (employee.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      employee,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching employee" });
  }
};
