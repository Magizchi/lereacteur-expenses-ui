import React from "react";

const input = ({ name, className, value, onChange, placeholder }) => (
  <input
    name={name}
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="py-1 pl-3 mb-1 mr-2 border-2 border-purple-200 rounded-full"
  />
);

export default input;
