import React from "react";

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-full border border-gray-200 bg-white px-5 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition font-medium ${className}`}
    {...props}
  />
);

export { Input }; 