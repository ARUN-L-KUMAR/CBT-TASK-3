import React from 'react';
import { motion } from 'framer-motion';

interface FundingProgressBarProps {
  currentAmount: number;
  goal: number;
  large?: boolean;
}

const FundingProgressBar: React.FC<FundingProgressBarProps> = ({
  currentAmount,
  goal,
  large = false,
}) => {
  // Calculate percentage
  const percentage = Math.min((currentAmount / goal) * 100, 100);
  const formattedPercentage = Math.round(percentage);

  // Format ETH amounts
  const formatEth = (amount: number) => {
    return amount.toFixed(4);
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <div className={`font-medium ${large ? 'text-base' : ''}`}>
          <span className="text-primary-600">{formattedPercentage}%</span> Funded
        </div>
        <div className={`text-gray-600 ${large ? 'text-base' : ''}`}>
          {formatEth(currentAmount)} ETH / {formatEth(goal)} ETH
        </div>
      </div>
      
      <div className={`progress-bar ${large ? 'h-6' : ''}`}>
        <motion.div
          className="progress-bar-fill bg-primary-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      {large && (
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500 mb-1">Raised so far</div>
            <div className="text-xl font-medium">{formatEth(currentAmount)} ETH</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500 mb-1">Funding goal</div>
            <div className="text-xl font-medium">{formatEth(goal)} ETH</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingProgressBar;