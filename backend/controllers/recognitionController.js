import Recognition from "../models/Recognition.js";
import mongoose from "mongoose";

// 📌 Fetch all recognitions (with sender & receiver details)
export const getRecognitions = async (req, res) => {
  try {
    const recognitions = await Recognition.find()
      .populate("from", "name email photo team")  // ✅ Sender details
      .populate("to", "name email photo team")    // ✅ Receiver details
      .sort({ createdAt: -1 });

    res.status(200).json(recognitions);
  } catch (err) {
    console.error("Error fetching recognitions:", err);
    res.status(500).json({ message: "Failed to fetch recognitions" });
  }
};

// 📌 Add a new recognition
export const addRecognition = async (req, res) => {
  try {
    const { from, to, category, message } = req.body;

    // ✅ Validate required fields
    if (!from || !to || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // ✅ Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({ message: "Invalid employee IDs" });
    }

    // ✅ Save recognition
    const recognition = new Recognition({ from, to, category, message });
    const savedRecognition = await recognition.save();

    // ✅ Populate sender & receiver details BEFORE sending response
    const populatedRecognition = await Recognition.findById(savedRecognition._id)
      .populate("from", "name email photo team")
      .populate("to", "name email photo team");

    res.status(201).json(populatedRecognition);
  } catch (error) {
    console.error("Error adding recognition:", error);
    res.status(500).json({ message: "Failed to add recognition" });
  }
};

// 📌 Fetch recognitions received by a specific employee
export const getRecognitionsByEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const recognitions = await Recognition.find({ to: id })
      .populate("from", "name email photo team")
      .populate("to", "name email photo team")
      .sort({ createdAt: -1 });

    res.status(200).json(recognitions);
  } catch (error) {
    console.error("Error fetching employee recognitions:", error);
    res.status(500).json({ message: "Failed to fetch employee recognitions" });
  }
};

// 📌 Leaderboard API
export const getLeaderboard = async (req, res) => {
  try {
    const { category } = req.query;
    const matchStage = category ? { category } : {};

    const leaderboard = await Recognition.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$to",
          totalRecognitions: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      { $sort: { totalRecognitions: -1 } },
    ]);

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

// 📌 Recognitions Given by an Employee
export const getRecognitionsByEmployeeGiven = async (req, res) => {
  try {
    const recognitions = await Recognition.find({ from: req.params.id })
      .populate("to", "name email photo team")
      .populate("from", "name email photo team")
      .sort({ createdAt: -1 });

    res.json(recognitions);
  } catch (error) {
    console.error("Error fetching recognitions given:", error);
    res.status(500).json({ message: "Failed to fetch recognitions given" });
  }
};

// 📌 Recognitions Received by an Employee
export const getRecognitionsByEmployeeReceived = async (req, res) => {
  try {
    const recognitions = await Recognition.find({ to: req.params.id })
      .populate("to", "name email photo team")
      .populate("from", "name email photo team")
      .sort({ createdAt: -1 });

    res.json(recognitions);
  } catch (error) {
    console.error("Error fetching recognitions received:", error);
    res.status(500).json({ message: "Failed to fetch recognitions received" });
  }
};
