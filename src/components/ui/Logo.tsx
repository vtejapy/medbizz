
import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 450 120"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <path
            id="shieldPath"
            d="M60 10 L15 30 V65 C15 95 60 115 60 115 C60 115 105 95 105 65 V30 L60 10 Z"
          />
          <clipPath id="clipShield">
            <use href="#shieldPath" />
          </clipPath>
        </defs>

        {/* Shield Icon */}
        <use href="#shieldPath" fill="#F4F6F8" />
        <g clipPath="url(#clipShield)">
          <rect x="60" y="0" width="60" height="120" fill="#214988" />
        </g>
        <path
          d="M25 65 H45 L53 50 L60 80 L67 35 L75 70 H95"
          stroke="#C83232" 
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {showText && (
          <>
            {/* medbizz text - using sans-serif for modern look */}
            <text 
              x="130" 
              y="85" 
              fill="#214988" 
              style={{ font: "bold 65px sans-serif", letterSpacing: "-2px" }}
            >
              medbizz
            </text>
            
            {/* Red dot on 'i' - precisely placed for sans-serif */}
            <circle cx="316" cy="48" r="6" fill="#C83232" />
            
            {/* CONSULTING text */}
            <text 
              x="135" 
              y="110" 
              fill="#214988" 
              style={{ font: "500 16px sans-serif", letterSpacing: "9px" }}
            >
              CONSULTING
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default Logo;
