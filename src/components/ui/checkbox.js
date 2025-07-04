import React from "react";

export function Checkbox({ checked, onCheckedChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
      className={`w-5 h-5 accent-blue-600 ${className}`}
      {...props}
    />
  );
} 