"use client";

import type { ButtonProps } from "../../../types";
import React from "react";

const baseStyle =
  "";

  // create a base style for the button 
  // - remember to define the variant as props in types.ts
const variants = {
  default: "",
  primary: "",
  secondary: "",
  danger: "",
};

const Button = ({
  children,
  variant = "default",
  className = "bg-[var(--color-acidYellow)] text-[var(--color-textBlack)] h-[38px] w-[320px] sm:w-[400px] md:w-[320px] lg:w-[320px] xl:w-[320px] rounded-full",
  ...props
}: ButtonProps) => (
  <button
    className={`${baseStyle} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
