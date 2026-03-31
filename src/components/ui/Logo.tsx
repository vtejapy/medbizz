
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
      {/* Background shape */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="16"
        className="fill-primary"
      />
      
      {/* Stylized M/B or medical cross */}
      <rect
        x="42"
        y="25"
        width="16"
        height="50"
        rx="4"
        className="fill-primary-foreground"
      />
      <rect
        x="25"
        y="42"
        width="50"
        height="16"
        rx="4"
        className="fill-primary-foreground"
      />
      
      {/* Dynamic pulse or accent */}
      <circle
        cx="75"
        cy="75"
        r="8"
        className="fill-accent"
      />
    </svg>
  );
};

export default Logo;
