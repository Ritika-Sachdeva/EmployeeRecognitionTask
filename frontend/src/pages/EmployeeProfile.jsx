import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../components/Navbar3";
import { serverUrl } from "../main";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [givenRecognitions, setGivenRecognitions] = useState([]);
  const [receivedRecognitions, setReceivedRecognitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch employee & recognitions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await axios.get(`${serverUrl}/api/employees/${id}`);
        setEmployee(empRes.data);

        const allEmployeesRes = await axios.get(`${serverUrl}/api/employees`);
        setEmployees(allEmployeesRes.data);

        const givenRes = await axios.get(`${serverUrl}/api/recognitions/given/${id}`);
        setGivenRecognitions(givenRes.data);

        const receivedRes = await axios.get(`${serverUrl}/api/recognitions/received/${id}`);
        setReceivedRecognitions(receivedRes.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <p className="text-center mt-10 text-red-500">Employee not found!</p>
      </div>
    );
  }

  // ✅ Prepare analytics data
  const categoryStats = receivedRecognitions.reduce((acc, recog) => {
    acc[recog.category] = (acc[recog.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryStats).map(([category, count]) => ({
    category,
    count,
  }));

  // ✅ Badge system based on total recognitions
  const totalRecognitions = receivedRecognitions.length;
  let badge = "🌱 Newbie";
  if (totalRecognitions >= 20) badge = "🏆 Platinum Legend";
  else if (totalRecognitions >= 10) badge = "🥇 Gold Champion";
  else if (totalRecognitions >= 5) badge = "🥈 Silver Achiever";
  else if (totalRecognitions >= 1) badge = "🥉 Bronze Contributor";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto mt-8 px-4 pb-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
          {/* Profile Picture */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {employee.photo ? (
              <img
                src={employee.photo || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              employee.name.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-gray-600">{employee.email}</p>
            <p className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full mt-2 inline-block">
              {employee.role || "Employee"}
            </p>
            <p className="mt-2 text-yellow-600 text-lg">{badge}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[
            { label: "Recognitions Given", value: givenRecognitions.length, color: "bg-blue-100" },
            { label: "Recognitions Received", value: receivedRecognitions.length, color: "bg-green-100" },
            { label: "Categories Achieved", value: Object.keys(categoryStats).length, color: "bg-purple-100" },
            { label: "Performance Badge", value: receivedRecognitions.length >= 5 ? "⭐" : "🎯", color: "bg-yellow-100" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.color} p-5 rounded-xl text-center shadow-md hover:shadow-lg transition-all`}
            >
              <h2 className="text-xl font-bold">{stat.value}</h2>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recognition Analytics */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📊 Recognition Analytics</h2>
          {chartData.length === 0 ? (
            <p className="text-gray-500">No recognition data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Recognitions */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">🏆 Recent Recognitions</h2>
          {receivedRecognitions.length === 0 ? (
            <p className="text-gray-500">No recognitions received yet.</p>
          ) : (
            <div className="space-y-4">
              {receivedRecognitions.map((recog) => (
                <div
                  key={recog._id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-blue-600">
                      From: {recog.from?.name || "Anonymous"}
                    </h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                      {recog.category}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">✨ {recog.message}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {dayjs(recog.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
