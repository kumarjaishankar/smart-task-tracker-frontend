import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ value, onChange, options, placeholder = "Select...", className = "" }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") setOpen((prev) => !prev);
    if (e.key === "ArrowDown" && !open) setOpen(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className="w-full rounded-full border border-gray-200 bg-gradient-to-r from-white via-blue-50 to-white px-5 py-2 text-center text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition flex items-center justify-between min-h-[40px] font-medium hover:shadow-lg hover:border-blue-300"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <svg
          className={`ml-2 h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          ref={menuRef}
          tabIndex={-1}
          className="absolute left-0 z-20 mt-2 w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 border border-gray-100 focus:outline-none animate-fade-in"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={0}
              className={`cursor-pointer px-5 py-2 text-sm transition-colors rounded-2xl flex items-center gap-2 select-none font-normal ${
                value === opt.value
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              {value === opt.value && (
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInDropdown 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInDropdown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dropdown; 