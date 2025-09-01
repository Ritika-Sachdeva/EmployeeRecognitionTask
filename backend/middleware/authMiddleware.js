import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check if Authorization header exists
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Find employee from token & attach to request
      req.employee = await Employee.findById(decoded.id).select("-password");

      if (!req.employee) {
        return res.status(401).json({ message: "Employee not found!" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, token missing!" });
    }
  } catch (error) {
    console.error("❌ Auth Error:", error);
    res.status(401).json({ message: "Not authorized, invalid token!" });
  }
};
