import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../assets/logo.jpg";

const Navbar = ({ onAddRecognition }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("employee"));

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex justify-between h-16 items-center">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <motion.img
                src={img}
                alt="FleetStudio"
                className="h-10 w-10 object-contain rounded-full border shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              <Link
                to="/recognitions"
                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
              >
                FleetStudio
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {/* Recognition Feed */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/recognitions"
                  className="text-gray-700 hover:text-blue-600 text-lg font-medium transition"
                >
                  Recognition Feed
                </Link>
              </motion.div>

              {/* Leaderboard */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/leaderboard"
                  className="text-gray-700 hover:text-blue-600 text-lg font-medium transition"
                >
                  Leaderboard
                </Link>
              </motion.div>

              {/* ✅ View All Employees */}
              {/* Employee Directory */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/employees"
                  className="text-gray-700 hover:text-blue-600 text-lg font-medium transition"
                >
                  Employee Directory
                </Link>
              </motion.div>

              {/* Add Recognition */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onAddRecognition}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md hover:shadow-lg transition font-semibold"
              >
                + Add Recognition
              </motion.button>

              {/* Profile */}
              {loggedInUser && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to={`/employee/${loggedInUser._id}`}
                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-200 transition shadow-sm"
                    title="My Profile"
                  >
                    👤 {loggedInUser.name?.split(" ")[0] || "Profile"}
                  </Link>
                </motion.div>
              )}

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-md hover:shadow-lg transition font-semibold"
              >
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 text-2xl focus:outline-none"
              >
                {isMenuOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 space-y-3 z-50 md:hidden"
          >
            <Link
              to="/recognitions"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              📰 Recognition Feed
            </Link>

            <Link
              to="/leaderboard"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              🏅 Leaderboard
            </Link>

            {/* ✅ View All Employees (Mobile) */}
            <Link
              to="/employees"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              👥 Employee Directory
            </Link>

            <button
              onClick={() => {
                onAddRecognition();
                setIsMenuOpen(false);
              }}
              className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
            >
              + Add Recognition
            </button>

            {loggedInUser && (
              <Link
                to={`/employee/${loggedInUser._id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
              >
                👤 {loggedInUser.name?.split(" ")[0] || "Profile"}
              </Link>
            )}

            <button
              onClick={() => {
                setShowLogoutConfirm(true);
                setIsMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
