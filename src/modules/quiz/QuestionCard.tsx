// src/modules/quiz/QuestionCard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion } from './data';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (optionIndex: number) => {
    if (disabled || showResult) return;

    setSelectedOption(optionIndex);
    setShowResult(true);
    const isCorrect = optionIndex === question.correct;
    onAnswer(isCorrect);
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">{question.question}</h3>
        <div className="text-sm text-blue-200 text-center mb-6">
          Reference: {question.reference}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correct;
          const isWrong = isSelected && !isCorrect;

          let optionClasses = "p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer";
          
          if (showResult) {
            if (isCorrect) {
              optionClasses += " bg-green-500/20 border-green-500 text-green-100";
            } else if (isWrong) {
              optionClasses += " bg-red-500/20 border-red-500 text-red-100";
            } else {
              optionClasses += " bg-gray-500/20 border-gray-500 text-gray-100";
            }
          } else {
            optionClasses += isSelected 
              ? " bg-blue-500/20 border-blue-500" 
              : " bg-white/10 border-white/20 hover:bg-white/20";
          }

          return (
            <motion.button
              key={index}
              className={optionClasses}
              onClick={() => handleOptionClick(index)}
              disabled={disabled}
              whileHover={!disabled && !showResult ? { scale: 1.02 } : {}}
              whileTap={!disabled && !showResult ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
                {showResult && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                )}
                {showResult && isWrong && (
                  <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          className="bg-blue-500/20 border border-blue-500 rounded-lg p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-blue-100">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
