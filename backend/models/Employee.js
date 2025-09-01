import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  team: {
    type: String,
    default: "General",
  },
  photo: {
    type: String,
    default: "", // Placeholder avatar
  },
   password: { type: String, required: true }, 
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
