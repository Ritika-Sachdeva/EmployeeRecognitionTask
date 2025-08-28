import React from "react";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition">
      <img
        src={employee.photo}
        alt={employee.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <h2 className="mt-3 text-lg font-semibold">{employee.name}</h2>
      <p className="text-gray-600 text-sm">{employee.email}</p>
      <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs mt-2">
        {employee.team}
      </p>
    </div>
  );
};

export default EmployeeCard;
