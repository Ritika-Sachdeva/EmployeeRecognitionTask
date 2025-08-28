import React from "react";

export default function InfoSection({ className = "" }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition ${className}`}>
      <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
        Empowering Innovation with FleetStudio
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed text-center mb-6">
        At <span className="font-semibold text-blue-600">FleetStudio</span>, we build
        cutting-edge digital products that transform businesses.  
        Our mission is to deliver seamless experiences through creativity,
        technology, and innovation.
      </p>

      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-blue-700">Product Strategy & Design</h3>
          <p className="text-gray-700 text-sm mt-1">
            We craft user-centric designs and intuitive product strategies
            that connect innovation with business goals.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-purple-700">Engineering Excellence</h3>
          <p className="text-gray-700 text-sm mt-1">
            From concept to code, our engineering teams deliver
            robust, scalable, and performance-driven applications.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-green-50 border border-green-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-green-700">Accelerating Growth</h3>
          <p className="text-gray-700 text-sm mt-1">
            We partner with startups and enterprises to build products faster,
            smarter, and better — driving long-term success.
          </p>
        </div>
      </div>
    </div>
  );
}
