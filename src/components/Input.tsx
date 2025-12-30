import React from "react";
import {type InputProps } from "../types/Forms";

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Put text here",
  value,
  onChange,
  className,
  name
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        name={name}
      />
    </div>
  );
};
