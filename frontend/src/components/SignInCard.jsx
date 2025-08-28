import React, { useState } from "react";

export default function SignInCard({ className = "" }) {
  const [role, setRole] = useState("student");

  return (
    <div className={`bg-white shadow-md rounded-2xl p-6 w-full max-w-md ml-10 ${className}`}>
      <h2 className="text-xl font-bold text-center mb-4">Sign In</h2>
      <p className="text-center text-gray-500 mb-4">
        Please select your role and enter your credentials
      </p>

      {/* Role Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setRole("student")}
          className={`border rounded-xl py-3 flex flex-col items-center justify-center ${
            role === "student"
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-300 text-gray-600"
          }`}
        >
          🎓 Student
          <span className="text-xs">Access your leave & OD requests</span>
        </button>
        <button
          onClick={() => setRole("staff")}
          className={`border rounded-xl py-3 flex flex-col items-center justify-center ${
            role === "staff"
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-300 text-gray-600"
          }`}
        >
          👨‍🏫 Staff
          <span className="text-xs">Manage student requests & approvals</span>
        </button>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Enter roll number"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
          Sign In
        </button>
      </form>

      <div className="text-center mt-3">
        <a href="#" className="text-blue-500 text-sm">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}
