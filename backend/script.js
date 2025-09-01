import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Employee from "./models/Employee.js";
import dotenv from "dotenv";

dotenv.config();

const resetPasswords = async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123", salt);

  const result = await Employee.updateMany({}, { password: hashedPassword });
  console.log("✅ Passwords reset for all employees:", result);

  await mongoose.disconnect();
};

resetPasswords();
