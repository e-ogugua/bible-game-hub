'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QuizQuestion, getQuestionsByDifficulty } from './data';
import { useGameContext } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressBar } from './ProgressBar';
import { localStorageService } from '@/lib/localStorage';
import { ScoreDisplay } from './ScoreDisplay';
import { QuestionCard } from './QuestionCard';

type Difficulty = 'easy' | 'medium' | 'hard';

export const QuizGame: React.FC = () => {
  const { gameState, startGame, resetGame, updateScore, nextQuestion } = useGameContext();
  const { user } = useAuth();
  const router = useRouter();
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('quiz');
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame]);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    const questions = getQuestionsByDifficulty(difficulty);
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentQuestions(shuffled);
    setShowDifficultySelection(false);
    setGameCompleted(false);
    startGame('quiz');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      updateScore(gameState.score + 1);
    }

    setTimeout(() => {
      if (gameState.currentQuestion < 9) {
        nextQuestion();
      } else {
        setGameCompleted(true);
        resetGame();

        // Save score to localStorage if user is logged in
        if (user) {
          localStorageService.saveGameScore({
            userId: user.id,
            gameType: 'quiz',
            score: gameState.score + (isCorrect ? 1 : 0),
            xpGained: Math.floor((gameState.score + (isCorrect ? 1 : 0)) * 10), // 10 XP per correct answer
            difficulty: 'medium' // Default difficulty
          });
        }
      }
    }, 2000); // Delay to show feedback
  };

  const handleReplay = () => {
    setShowDifficultySelection(true);
    setCurrentQuestions([]);
    setGameCompleted(false);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (showDifficultySelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Choose Difficulty</h2>
          <div className="space-y-4">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
              <motion.button
                key={difficulty}
                className={`w-full p-4 rounded-lg font-semibold capitalize transition-all duration-300 ${
                  difficulty === 'easy' ? 'bg-green-600 hover:bg-green-700' :
                  difficulty === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-red-600 hover:bg-red-700'
                }`}
                onClick={() => handleDifficultySelect(difficulty)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {difficulty}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((gameState.score / 10) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-6">
            You scored {gameState.score} out of 10 ({percentage}%)
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
              onClick={handleReplay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </motion.button>
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[gameState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header with Score and Progress */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ScoreDisplay score={gameState.score} />
          <ProgressBar current={gameState.currentQuestion + 1} total={10} />
        </motion.div>

        {/* Question Card */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={gameState.gameStarted && !gameState.currentGame}
          />
        )}
      </div>
    </div>
  );
};
