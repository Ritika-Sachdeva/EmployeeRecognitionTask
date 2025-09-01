import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import img from "../assets/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("employee"));

  // ✅ Logout the user
  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar */}
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

              {/* 🚀 Employee Directory */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/employees"
                  className="text-gray-700 hover:text-blue-600 text-lg font-medium transition"
                >
                  Employee Directory
                </Link>
              </motion.div>

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

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowConfirmLogout(true)}
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

            {/* 🚀 Employee Directory */}
            <Link
              to="/employees"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              👥 Employee Directory
            </Link>

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
                setShowConfirmLogout(true);
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
      <AnimatePresence>
        {showConfirmLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowConfirmLogout(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
