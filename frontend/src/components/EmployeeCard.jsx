import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/employee/${employee._id}`)}
      className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col items-center text-center"
    >
      {/* Profile Image / Initials */}
      {employee.photo ? (
        <img
          src={employee.photo}
          alt={employee.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 object-cover"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl font-bold shadow-md mb-4">
          {getInitials(employee.name)}
        </div>
      )}

      {/* Name */}
      <h2 className="text-xl font-semibold text-gray-800">{employee.name}</h2>

      {/* Email */}
      <p className="text-gray-500 text-sm truncate w-40">{employee.email}</p>

      {/* Team */}
      <span className="mt-3 px-4 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full shadow">
        {employee.team || "Unassigned"}
      </span>

      {/* View Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
      >
        View Profile
      </motion.button>
    </motion.div>
  );
};

export default EmployeeCard;
