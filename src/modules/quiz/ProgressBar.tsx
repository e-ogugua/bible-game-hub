// src/modules/quiz/ProgressBar.tsx
'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{current} of {total}</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};
