import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 shadow-inner">
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {/* Branding */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-bold text-blue-600"
          >
            FleetStudio
          </motion.h2>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Building superior product experiences that make a difference.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            {[
              { icon: <FaFacebookF />, href: "#" },
              { icon: <FaTwitter />, href: "#" },
              { icon: <FaLinkedinIn />, href: "#" },
              { icon: <FaInstagram />, href: "#" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
  <ul className="space-y-2 text-sm text-gray-600">
    <li>
      <a
        href="https://www.fleetstudio.com/about-us"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition"
      >
        About Us
      </a>
    </li>
    
    <li>
      <a
        href="https://www.fleetstudio.com/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition"
      >
        Privacy Policy
      </a>
    </li>
  </ul>
</div>


        {/* Contact Info - Horizontal */}
        <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Us</h3>
  
  <div className="flex flex-row justify-between gap-8 text-sm text-gray-600 flex-wrap md:flex-nowrap">
    {/* Princeton */}
    <div className="w-full md:w-1/3">
      <strong className="text-gray-800">Princeton</strong>
      <p>100 Nassau St, 2nd Floor</p>
      <p>Princeton, NJ 08542</p>
      <a href="mailto:info@fleetstudio.com" className="hover:text-blue-600">
        info@fleetstudio.com
      </a>
    </div>

    {/* New York */}
    <div className="w-full md:w-1/3">
      <strong className="text-gray-800">New York</strong>
      <p>175 Varick St</p>
      <p>New York, NY 10014</p>
      <a href="mailto:info@fleetstudio.com" className="hover:text-blue-600">
        info@fleetstudio.com
      </a>
    </div>

    {/* Chennai */}
    <div className="w-full md:w-1/3">
      <strong className="text-gray-800">Chennai</strong>
      <p>443, Anna Salai, Teynampet</p>
      <p>Chennai, Tamil Nadu 600018</p>
      <a href="mailto:info@fleetstudio.com" className="hover:text-blue-600">
        info@fleetstudio.com
      </a>
    </div>
  </div>
</div>

      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-t border-gray-200 py-5 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()} FleetStudio Inc. All rights reserved. Developed by Ritika Sachdeva
      </motion.div>
    </footer>
  );
};

export default Footer;
