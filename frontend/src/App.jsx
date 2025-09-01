/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import RecognitionFeed from "./pages/RecognitionFeed";
import Leaderboard from "./components/Leaderboard";
import EmployeeProfile from "./pages/EmployeeProfile";
EmployeeProfile
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<RecognitionFeed />} />
         <Route path="/leaderboard" element={<Leaderboard />} />
         <Route path="/employee/:id" element={<EmployeeProfile />} />

        <Route path="/employees" element={<EmployeeDirectory />} />
      </Routes>
    </Router>
  );
}

export default App;
*/
/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6 mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
*/
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecognitionFeed from "./pages/RecognitionFeed";
import EmployeeProfile from "./pages/EmployeeProfile";
import Leaderboard from "./components/Leaderboard";
import SignInPage from "./pages/SignInPage";
import Home from "./pages/Home";
import EmployeesPage from "./pages/EmployeeDirectory";
// ✅ Utility: Get employee from localStorage safely
const safeGetEmployee = () => {
  try {
    return JSON.parse(localStorage.getItem("employee"));
  } catch {
    return null;
  }
};

// ✅ Protected Route: Block unauthorized users
const ProtectedRoute = ({ children }) => {
  const employee = safeGetEmployee();
  return employee ? children : <Navigate to="/login" replace />;
};

// ✅ If already logged in → redirect to profile
const RedirectIfLoggedIn = ({ children }) => {
  const employee = safeGetEmployee();
  return employee ? (
    <Navigate to={`/employee/${employee._id}`} replace />
  ) : (
    children
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Home Page (Public) */}
        <Route path="/home" element={<Home />} />

        {/* ✅ Login Page */}
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <SignInPage />
            </RedirectIfLoggedIn>
          }
        />
        <Route
  path="/employees"
  element={
    <ProtectedRoute>
      <EmployeesPage />
    </ProtectedRoute>
  }
/>

        {/* ✅ Default Route */}
        <Route
          path="/"
          element={
            safeGetEmployee() ? (
              <Navigate to={`/employee/${safeGetEmployee()?._id}`} replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* ✅ Employee Profile (Protected) */}
        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />

        {/* ✅ Recognition Feed (Protected) */}
        <Route
          path="/recognitions"
          element={
            <ProtectedRoute>
              <RecognitionFeed />
            </ProtectedRoute>
          }
        />

        {/* ✅ Leaderboard (Protected) */}
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Fallback for Invalid Routes */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                safeGetEmployee()
                  ? `/employee/${safeGetEmployee()?._id}`
                  : "/home"
              }
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
