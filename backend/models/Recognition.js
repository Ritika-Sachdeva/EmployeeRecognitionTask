import mongoose from "mongoose";

const recognitionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    category: {
      type: String,
      enum: ["Teamwork", "Innovation", "Customer Success", "Leadership", "Others"],
      default: "Others",
    },
    message: {
      type: String,
      required: true,
      maxlength: 240,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recognition", recognitionSchema);
