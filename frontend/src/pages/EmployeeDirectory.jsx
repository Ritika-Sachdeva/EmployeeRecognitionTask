import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import { serverUrl } from "../main";
import Navbar from "../components/Navbar3";  // ✅ Import Navbar

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ✅ Navbar at the top */}
      <Navbar />

      {/* ✅ Page Title */}
      <div className="p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide drop-shadow-sm">
          👩‍💼 Employee Directory
        </h1>

        {/* ✅ Loading State */}
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">⚠️ No employees found</p>
        ) : (
          /* ✅ Employees Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {employees.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
