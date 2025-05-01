import React from 'react';
import { Landmark } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <div className={`relative ${className}`}>
      <Landmark className="text-primary-600" />
      <div className="absolute -bottom-1 -right-1 bg-accent-400 rounded-full h-3 w-3 border-2 border-white" />
    </div>
  );
};

export default Logo;