import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

const RecognitionFeed = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [to, setTo] = useState("");
  const [category, setCategory] = useState("Teamwork");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("employee"));

  // ✅ Fetch recognitions
  const fetchRecognitions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/recognitions");
      setRecognitions(res.data);
    } catch (error) {
      console.error("Error fetching recognitions:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch employees for dropdowns
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchRecognitions();
    fetchEmployees();
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!to || !message) {
      setError("Please fill all required fields!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/recognitions", {
        from: loggedInUser?._id,
        to,
        category,
        message,
      });

      setSuccess("🎉 Recognition added successfully!");
      setTo("");
      setMessage("");
      setCategory("Teamwork");
      setShowModal(false);
      fetchRecognitions();
    } catch (err) {
      console.error(err);
      setError("Failed to add recognition!");
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading recognitions...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar with working "+ Add Recognition" button */}
      <Navbar onAddRecognition={() => setShowModal(true)} />

      <div className="max-w-3xl mx-auto mt-8 px-4">
        {/* Recognition List */}
        {recognitions.length === 0 ? (
          <p className="text-center text-gray-500">
            No recognitions yet. Be the first! 🎉
          </p>
        ) : (
          <div className="space-y-4">
            {recognitions.map((recog) => (
              <div
                key={recog._id}
                className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <Link
                    to={`/employee/${recog.from?._id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {recog.from?.name || "Unknown User"}
                  </Link>

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {recog.category}
                  </span>
                </div>

                <p className="text-gray-800 mt-2">✨ {recog.message}</p>

                <div className="flex justify-between mt-3 text-sm text-gray-500">
                  <p>
                    To:{" "}
                    <span className="font-semibold">
                      <Link
                        to={`/employee/${recog.to?._id}`}
                        className="font-semibold"
                      >
                        {recog.to?.name || "Unknown User"}
                      </Link>
                    </span>
                  </p>
                  <p>{dayjs(recog.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Adding Recognition */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-5 text-center">
              🏆 Add Recognition
            </h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-600 mb-3">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* To Dropdown */}
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
                    .filter((emp) => emp._id !== loggedInUser?._id) // ✅ Exclude self
                    .map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Category */}
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

              {/* Message */}
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

              {/* Submit */}
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

export default RecognitionFeed;
