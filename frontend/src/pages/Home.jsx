import React from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import img1 from "../assets/venu.png";
import img2 from "../assets/latha.png";
import img3 from "../assets/sri.png";
import img4 from "../assets/sheikh.png";
import img5 from "../assets/deepa.png";
import img6 from "../assets/david.png";
import img7 from "../assets/andy.png";
import img8 from "../assets/kip.png";
import img9 from "../assets/nick.png";
import img10 from "../assets/kris.png";
export default function Home() {
  // 10 Sample Images (replace with your actual images if needed)
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* ✅ Top Navbar */}
      <Navbar />

      {/* ✅ Main Content Section */}
      <main className="flex-grow pb-16">

        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-2 gap-10 items-center min-h-[calc(100vh-200px)]">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 leading-snug">
              FleetStudio <span className="text-blue-600">Credora</span>
            </h1>
            <p className="mt-5 text-gray-600 text-lg md:text-xl leading-relaxed">
              Empowering employees, celebrating achievements, and fostering a
              culture of appreciation. Join us and be a part of something
              amazing.
            </p>

            {/* Get Started Button */}
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-8 px-8 py-3 text-lg bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300"
            >
              Get Started →
            </button>
          </motion.div>

          {/* ✅ Right Side → Two Rolling Image Rows */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-gray-200 hover:shadow-3xl transition flex flex-col gap-6 overflow-hidden"
          >
            {/* Top Row → Moves Left */}
            <motion.div
              className="flex space-x-4"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              {[...images, ...images].map((src, idx) => (
                <img
                  key={`top-${idx}`}
                  src={src}
                  alt={`top-${idx}`}
                  className="w-48 h-32 rounded-xl object-cover shadow-md"
                />
              ))}
            </motion.div>

            {/* Bottom Row → Moves Right */}
            <motion.div
              className="flex space-x-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              {[...images, ...images].map((src, idx) => (
                <img
                  key={`bottom-${idx}`}
                  src={src}
                  alt={`bottom-${idx}`}
                  className="w-48 h-32 rounded-xl object-cover shadow-md"
                />
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ✅ Footer Always at Bottom */}
      <Footer className="mt-auto" />

    </div>
  );
}
