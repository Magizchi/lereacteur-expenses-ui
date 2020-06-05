import React from "react";

const Button = ({ text, onClick, type = "button" }) => (
  <button
    onClick={onClick}
    className="w-32 p-1 text-black bg-purple-600 rounded-full"
    type={type}
  >
    {text}
  </button>
);

export default Button;
