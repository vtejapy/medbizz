
import React from "react";
import logoImg from "@/assets/logo-optimized.png";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img 
      src={logoImg} 
      alt="MedBizz Logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;
