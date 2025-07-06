import React from "react";

export function Checkbox({ checked, onCheckedChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
      className={`w-5 h-5 rounded border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-150 ${className}`}
      {...props}
    />
  );
} 