import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Directory</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading employees...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {employees.map((emp) => (
            <EmployeeCard key={emp._id} employee={emp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDirectory;
