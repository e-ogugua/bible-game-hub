'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QuizQuestion, getQuestionsByDifficulty } from './data';
import { useGameContext } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { localStorageService } from '@/lib/localStorage';
import { dailyChallengesService } from '@/lib/dailyChallenges';
import { ScoreDisplay } from './ScoreDisplay';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';

type Difficulty = 'easy' | 'medium' | 'hard';

export const QuizGame: React.FC = () => {
  const { gameState, startGame, updateScore, nextQuestion } = useGameContext();
  const { user } = useAuth();
  const router = useRouter();
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('quiz');
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame]);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    const questions = getQuestionsByDifficulty(difficulty);
    setCurrentQuestions(questions);
    setShowDifficultySelection(false);
    startGame('quiz');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      updateScore(gameState.score + 1);
    }

    setTimeout(() => {
      if (gameState.currentQuestion >= 9) {
        // Game completed
        setGameCompleted(true);

        // Save score to localStorage if user is logged in
        if (user) {
          localStorageService.saveGameScore({
            userId: user.id,
            gameType: 'quiz',
            score: gameState.score + (isCorrect ? 1 : 0),
            xpGained: Math.floor((gameState.score + (isCorrect ? 1 : 0)) * 10), // 10 XP per correct answer
            difficulty: 'medium' // Default difficulty
          });

          // Update quiz streak in daily challenges
          dailyChallengesService.updateQuizStreak(user.id, gameState.score + (isCorrect ? 1 : 0) >= 7); // Consider 70%+ as completion
        }
      } else {
        nextQuestion();
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

  // Don't render during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading quiz game...</p>
        </div>
      </div>
    );
  }

  if (showDifficultySelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Choose Your Challenge</h2>
            <p className="text-blue-200">Select difficulty level to begin your Bible knowledge journey</p>
          </div>

          <div className="space-y-4">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty, index) => (
              <motion.button
                key={difficulty}
                className={`w-full p-4 rounded-lg font-semibold capitalize transition-all duration-300 relative overflow-hidden ${
                  difficulty === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' :
                  difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700' :
                  'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                }`}
                onClick={() => handleDifficultySelect(difficulty)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-lg">
                    {difficulty === 'easy' ? '🌱' : difficulty === 'medium' ? '⚡' : '🔥'}
                  </span>
                  <span className="text-xl">{difficulty}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-blue-200">
            <p>Easy: Basic Bible knowledge • Medium: Intermediate questions • Hard: Advanced study</p>
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
        <motion.div
          key={`question-${gameState.currentQuestion}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={gameState.gameStarted && !gameState.currentGame}
              questionKey={`${gameState.currentQuestion}-${currentQuestion.id}`}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
