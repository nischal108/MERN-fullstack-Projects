import React from "react";

const InputBox = ({ handleChange }) => {
  return (
    <div className="mt-24 relative w-6/12 mx-auto">
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-slate-300 rounded-md px-6 py-2 pr-10"
        autoFocus
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default InputBox;
