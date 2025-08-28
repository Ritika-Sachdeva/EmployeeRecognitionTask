import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/logo.jpg"
export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={img}
          alt="Fleetstudio"
          className="h-8 w-8 object-contain"
        />
        <span className="font-semibold text-lg text-blue-600">FleetStudio</span>
      </div>
      <div className="flex items-center gap-6">
        {/* ✅ Home Link */}
        <Link
          to="/home"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link to="/login">
          <button className="px-4 py-1 border rounded-xl flex items-center gap-2 text-blue-600 hover:bg-blue-50 transition">
            <span>Log In</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}