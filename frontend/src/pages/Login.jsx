import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ className = "" }) {
  const [activeTab, setActiveTab] = useState("employee"); // Default Employee
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        activeTab === "employee"
          ? "http://localhost:8000/api/employees/login"
          : "http://localhost:8000/api/admin/login";

      const res = await axios.post(endpoint, { email, password });

      if (activeTab === "employee") {
        localStorage.setItem("employee", JSON.stringify(res.data.employee));
        navigate(`/profile/${res.data.employee._id}`);
      } else {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate(`/admin/dashboard`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again!");
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-8 w-full max-w-md border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        Login
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("employee")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === "employee"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Employee
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === "admin"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Admin
        </button>
      </div>

      <p className="text-center text-gray-600 mb-5 text-sm tracking-wide">
        Please enter your email and password to continue
      </p>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      {/* Login Form */}
      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Email */}
        <label
          htmlFor="email"
          className="block text-gray-700 font-medium tracking-wide"
        >
          Enter your Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md hover:shadow-lg transition duration-300"
          required
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium tracking-wide"
        >
          Enter your Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md hover:shadow-lg transition duration-300"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-blue-400/50 transition-all duration-300"
        >
          {activeTab === "employee" ? "Login as Employee" : "Login as Admin"}
        </button>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 text-sm transition"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
}
