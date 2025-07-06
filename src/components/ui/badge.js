import React from "react";

const colorMap = {
  gray: "bg-gray-100 text-gray-700 border border-gray-200",
  blue: "bg-blue-100 text-blue-700 border border-blue-200",
  green: "bg-green-100 text-green-700 border border-green-200",
  yellow: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  red: "bg-red-100 text-red-700 border border-red-200",
  purple: "bg-purple-100 text-purple-700 border border-purple-200",
  pink: "bg-pink-100 text-pink-700 border border-pink-200",
  info: "bg-blue-50 text-blue-600 border border-blue-100",
  secondary: "bg-gray-50 text-gray-600 border border-gray-100",
};

const Badge = ({ children, color = "gray", className = "" }) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
      colorMap[color] || colorMap.gray
    } ${className}`}
  >
    {children}
  </span>
);

export { Badge };