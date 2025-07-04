import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`} {...props}>
      {children}
    </span>
  );
}