import React from "react";
import InfoSection from "../components/InfoSection";
import Login from "../pages/Login";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Navbar at the top */}
      <Navbar />

      {/* ✅ Login + Info Sections */}
      <div className="flex-grow flex items-center justify-center px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
          {/* Sign In Card */}
          <Login className="order-1 md:order-2 md:ml-10 ml-0" />


          {/* Info Section */}
          <InfoSection className="order-2 md:order-1" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
