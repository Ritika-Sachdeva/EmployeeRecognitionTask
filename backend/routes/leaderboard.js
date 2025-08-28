import express from "express";
import Recognition from "../models/Recognition.js";
import Employee from "../models/Employee.js";

const router = express.Router();

// GET Leaderboard - Top employees based on recognitions
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Recognition.aggregate([
      {
        $group: {
          _id: "$to", // Group by the "to" employee (who received recognition)
          totalRecognitions: { $sum: 1 },
        },
      },
      { $sort: { totalRecognitions: -1 } },
    ]);

    // Populate employee details for each leaderboard entry
    const detailedLeaderboard = await Promise.all(
      leaderboard.map(async (entry) => {
        const employee = await Employee.findById(entry._id).lean();
        return {
          _id: entry._id,
          name: employee ? employee.name : "Unknown",
          totalRecognitions: entry.totalRecognitions,
        };
      })
    );

    res.json(detailedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

export default router;
