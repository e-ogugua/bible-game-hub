// src/modules/memory/Card.tsx
'use client';

import { motion } from 'framer-motion';
import { MemoryCard as MemoryCardType } from './data';

interface CardProps {
  card: MemoryCardType;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  return (
    <motion.div
      className={`relative w-full aspect-square cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <motion.div
        className={`relative w-full h-full transition-transform duration-700 ${isFlipped || isMatched ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg border-2 border-purple-400 flex items-center justify-center shadow-lg">
            <div className="text-white text-4xl font-bold">?</div>
          </div>
        </div>
        
        {/* Card Front */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${
            isMatched ? 'bg-green-500/20 border-green-500' : 'bg-white/10 border-white/20'
          } rounded-lg border-2 flex items-center justify-center p-2 shadow-lg`}
        >
          <div className={`text-center ${card.type === 'verse' ? 'text-sm' : 'text-xs'} text-white`}>
            {card.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
