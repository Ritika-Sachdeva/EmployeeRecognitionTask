import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState("allTime"); // allTime | weekly
  const navigate = useNavigate();

  // Fetch leaderboard data
  const fetchLeaderboard = async (selectedCategory = "", tab = "allTime") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/recognitions/leaderboard?category=${selectedCategory}&range=${tab}`
      );
      setLeaders(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(category, activeTab);
  }, [activeTab]);

  // Calculate proper ranks even if there are ties
  const calculateRank = (leaders) => {
  let rank = 1;
  let prevScore = null;

  return leaders.map((leader, index) => {
    // If first leader OR score changes → increase rank
    if (index === 0) {
      prevScore = leader.totalRecognitions;
    } else if (leader.totalRecognitions !== prevScore) {
      rank++; // Only increase rank when score changes
      prevScore = leader.totalRecognitions;
    }

    return { ...leader, rank };
  });
};


  const rankedLeaders = calculateRank(leaders);

  // Circle style for top 3 ranks
  const getRankCircleStyle = (rank) => {
    if (rank === 1)
      return "bg-yellow-400 text-white font-bold border-2 border-yellow-500";
    if (rank === 2)
      return "bg-gray-400 text-white font-bold border-2 border-gray-500";
    if (rank === 3)
      return "bg-orange-400 text-white font-bold border-2 border-orange-500";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🏆 Leaderboard
        </h1>

        {/* Tabs: Weekly | All Time */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("allTime")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "allTime"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Time
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-6">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              fetchLeaderboard(e.target.value, activeTab);
            }}
            className="p-2 border rounded-lg bg-white shadow-sm"
          >
            <option value="">All Categories</option>
            <option value="Teamwork">Teamwork</option>
            <option value="Innovation">Innovation</option>
            <option value="Leadership">Leadership</option>
            <option value="Customer Success">Customer Success</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading leaderboard...</p>
        ) : rankedLeaders.length === 0 ? (
          <p className="text-center text-gray-500">😢 No recognitions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 border border-gray-200 text-center">Rank</th>
                  <th className="py-3 px-4 border border-gray-200">Employee</th>
                  <th className="py-3 px-4 border border-gray-200 text-center">
                    Recognitions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankedLeaders.map((leader, index) => (
                  <motion.tr
                    key={leader.employee._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    {/* Rank with Circle */}
                    <td className="py-3 px-4 border border-gray-200 text-center">
                      <span
                        className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto ${getRankCircleStyle(
                          leader.rank
                        )}`}
                      >
                        {leader.rank}
                      </span>
                    </td>

                    {/* Employee Info - Clickable */}
                    <td
                      onClick={() => navigate(`/employee/${leader.employee._id}`)}
                      className="py-3 px-4 border border-gray-200 flex items-center gap-3 cursor-pointer hover:underline"
                    >
                      <img
                        src={
                          leader.employee.avatar ||
                          `https://ui-avatars.com/api/?name=${leader.employee.name}&background=random`
                        }
                        alt="profile"
                        className="w-10 h-10 rounded-full border"
                      />
                      <span className="font-medium text-gray-800">
                        {leader.employee.name}
                      </span>
                    </td>

                    {/* Recognitions */}
                    <td className="py-3 px-4 border border-gray-200 text-center font-semibold text-blue-600">
                      {leader.totalRecognitions}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Leaderboard;
