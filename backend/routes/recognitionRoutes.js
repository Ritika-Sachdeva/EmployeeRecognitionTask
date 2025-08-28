import express from "express";
import {
  getRecognitions,
  addRecognition,
  getRecognitionsByEmployee,
  getLeaderboard,
  getRecognitionsByEmployeeGiven,
  getRecognitionsByEmployeeReceived
} from "../controllers/recognitionController.js";

const router = express.Router();

// ✅ 1. GET all recognitions
router.get("/", getRecognitions);

// ✅ 2. POST a new recognition
router.post("/", addRecognition);

// ✅ 3. Given & Received must come BEFORE `/:id`
router.get("/given/:id", getRecognitionsByEmployeeGiven);
router.get("/received/:id", getRecognitionsByEmployeeReceived);

// ✅ 4. Leaderboard route (optional, if you have it)
router.get("/leaderboard", getLeaderboard);

// ✅ 5. Finally — fetch recognitions for a specific employee
router.get("/:id", getRecognitionsByEmployee);

export default router;
