// src/modules/quiz/ScoreDisplay.tsx
'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, className = '' }) => {
  return (
    <motion.div
      className={`flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-100 px-4 py-2 rounded-full border border-yellow-400/30 ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Trophy className="w-5 h-5 text-yellow-400" />
      <span className="font-semibold">Score: {score}</span>
    </motion.div>
  );
};
