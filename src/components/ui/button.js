import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  let base = "px-4 py-2 rounded font-medium focus:outline-none transition-all duration-150";
  let variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
} 