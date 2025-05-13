import React from 'react';
import { Landmark, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6", animated = false }) => {
  const LogoContent = () => (
    <>
      <div className="relative z-10">
        <Landmark className="text-primary-600" />
      </div>
      <div className="absolute -bottom-1 -right-1 z-20 bg-gradient-to-br from-accent-300 to-accent-500 rounded-full h-3 w-3 border-2 border-white shadow-sm">
        <Coins className="h-full w-full text-accent-700 opacity-70" />
      </div>
      <div className="absolute inset-0 bg-primary-100 rounded-full opacity-20" />
    </>
  );

  return animated ? (
    <motion.div
      className={`relative ${className}`}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    >
      <LogoContent />
    </motion.div>
  ) : (
    <div className={`relative ${className}`}>
      <LogoContent />
    </div>
  );
};

export default Logo;