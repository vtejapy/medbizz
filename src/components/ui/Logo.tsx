
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
    >
      {/* Shield shape */}
      <path
        d="M50 5 L12 22 V50 C12 75 50 95 50 95 C50 95 88 75 88 50 V22 L50 5 Z"
        className="fill-primary"
      />
      
      {/* Medical Cross inside shield */}
      <rect
        x="42"
        y="30"
        width="16"
        height="40"
        rx="2"
        className="fill-primary-foreground"
      />
      <rect
        x="30"
        y="42"
        width="40"
        height="16"
        rx="2"
        className="fill-primary-foreground"
      />
    </svg>
  );
};

export default Logo;
