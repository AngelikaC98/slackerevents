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
  className = " z-10  flex items-center justify-center border border-[var(--color-acidYellow)] text-[var(--color-acidYellow)] text-3xl h-[34px] w-[34px] sm:w-[38px] md:w-[38px] lg:w-[38px] xl:w-[38px] rounded-xl",
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
