import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
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

  const [showModal, setShowModal] = useState(false);
  const [to, setTo] = useState("");
  const [category, setCategory] = useState("Teamwork");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch employee & recognitions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await axios.get(`http://localhost:8000/api/employees/${id}`);
        setEmployee(empRes.data);

        const allEmployeesRes = await axios.get(`http://localhost:8000/api/employees`);
        setEmployees(allEmployeesRes.data);

        const givenRes = await axios.get(`http://localhost:8000/api/recognitions/given/${id}`);
        setGivenRecognitions(givenRes.data);

        const receivedRes = await axios.get(`http://localhost:8000/api/recognitions/received/${id}`);
        setReceivedRecognitions(receivedRes.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Submit recognition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/recognitions", {
        to,
        from: id,
        category,
        message,
      });
      setSuccess("Recognition sent successfully!");
      setError("");
      setTo("");
      setMessage("");
      setCategory("Teamwork");
      setShowModal(false);

      // Refresh received recognitions
      const receivedRes = await axios.get(`http://localhost:8000/api/recognitions/received/${id}`);
      setReceivedRecognitions(receivedRes.data);
    } catch (err) {
      setError("Failed to send recognition. Try again!");
      console.error(err);
    }
  };

  // Loading state
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

  // Prepare analytics data
  const categoryStats = receivedRecognitions.reduce((acc, recog) => {
    acc[recog.category] = (acc[recog.category] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(categoryStats).map(([category, count]) => ({
    category,
    count,
  }));

  const totalRecognitions = receivedRecognitions.length;
  let badge = "🌱 Newbie";
  if (totalRecognitions >= 20) badge = "🏆 Platinum Legend";
  else if (totalRecognitions >= 10) badge = "🥇 Gold Champion";
  else if (totalRecognitions >= 5) badge = "🥈 Silver Achiever";
  else if (totalRecognitions >= 1) badge = "🥉 Bronze Contributor";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar onAddRecognition={() => setShowModal(true)} />

      <div className="max-w-5xl mx-auto mt-8 px-4 pb-12">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-gray-600">{employee.email}</p>
            <p className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full mt-2 inline-block">
              {employee.role || "Employee"}
            </p>
            <p className="mt-2 text-yellow-600 text-lg">{badge}</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Recognitions Given", value: givenRecognitions.length, color: "bg-blue-100" },
            { label: "Recognitions Received", value: receivedRecognitions.length, color: "bg-green-100" },
            { label: "Categories Achieved", value: Object.keys(categoryStats).length, color: "bg-purple-100" },
            { label: "Performance Badge", value: receivedRecognitions.length >= 5 ? "⭐" : "🎯", color: "bg-yellow-100" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`${stat.color} p-5 rounded-xl text-center shadow-md hover:shadow-lg hover:scale-105 transition-all`}
            >
              <h2 className="text-xl font-bold">{stat.value}</h2>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recognition Analytics */}
        <motion.div
          className="mt-10 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
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
        </motion.div>

        {/* Recent Recognitions */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">🏆 Recent Recognitions</h2>
          {receivedRecognitions.length === 0 ? (
            <p className="text-gray-500">No recognitions received yet.</p>
          ) : (
            <div className="space-y-4">
              {receivedRecognitions.map((recog, index) => (
                <motion.div
                  key={recog._id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
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
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-5 text-center">🏆 Add Recognition</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-600 mb-3">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees
                    .filter((emp) => emp._id !== id)
                    .map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Teamwork">Teamwork</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Write your recognition message..."
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Submit Recognition
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
