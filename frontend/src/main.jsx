// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required for styling
import axios from "axios";

// ✅ Server URL
export const serverUrl = "https://employeerecognitiontask.onrender.com";

// ✅ Set default base URL
axios.defaults.baseURL = serverUrl;

// ✅ Set token if exists (so axios auto-sends it)
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* ✅ ToastContainer should be inside StrictMode */}
    <ToastContainer position="top-right" autoClose={2000} />
  </StrictMode>
);
