import express from "express";
import { getAllEmployees ,getEmployeeById ,loginEmployee} from "../controllers/employeeController.js";

const router = express.Router();

// Route to get all employees
router.get("/", getAllEmployees);
router.post("/login", loginEmployee);
router.get("/:id", getEmployeeById);
export default router;
