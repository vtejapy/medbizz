
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
      {/* Define the shield shape for reuse in clipping */}
      <defs>
        <path
          id="shieldPath"
          d="M50 5 L12 22 V50 C12 75 50 95 50 95 C50 95 88 75 88 50 V22 L50 5 Z"
        />
        <clipPath id="clipShield">
          <use href="#shieldPath" />
        </clipPath>
      </defs>

      {/* Whole Shield with Border */}
      <use 
        href="#shieldPath" 
        className="fill-white stroke-primary" 
        strokeWidth="2"
      />

      {/* Blue Right Half */}
      <g clipPath="url(#clipShield)">
        <rect x="50" y="0" width="50" height="100" className="fill-primary" />
      </g>

      {/* Red Pulse/Life Line */}
      <path
        d="M20 50 H35 L42 30 L50 70 L58 15 L65 50 H80"
        stroke="#ef4444" 
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
