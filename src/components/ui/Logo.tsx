
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Shield Shape */}
      <path
        d="M50 5 L12 22 V50 C12 75 50 95 50 95 C50 95 88 75 88 50 V22 L50 5 Z"
        className="fill-primary"
      />
      
      {/* Pulse Line inside shield */}
      <path
        d="M25 50 H38 L43 35 L50 65 L58 20 L65 50 H75"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
    </svg>
  );
};

export default Logo;
