'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw, Clock, Target, Volume2, VolumeX, HelpCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameContext } from '@/contexts/GameContext';
import { MemoryCard, easyCards, mediumCards, hardCards, shuffleCards } from './data';
import { Card } from './Card';

type Difficulty = 'easy' | 'medium' | 'hard';

export const MemoryGame: React.FC = () => {
  const { gameState, startGame, updateScore } = useGameContext();
  const router = useRouter();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');
  const [showInstructions, setShowInstructions] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('memory');
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame]);

  const getCardsForDifficulty = (difficulty: Difficulty): MemoryCard[] => {
    switch (difficulty) {
      case 'easy': return easyCards;
      case 'medium': return mediumCards;
      case 'hard': return hardCards;
    }
  };

  const getGridCols = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-4'; // 2x4 grid
      case 'medium': return 'grid-cols-4'; // 3x4 grid
      case 'hard': return 'grid-cols-4'; // 4x4 grid
    }
  };

  const startNewGame = (difficulty: Difficulty) => {
    const cardsForDifficulty = getCardsForDifficulty(difficulty);
    const shuffledCards = shuffleCards(cardsForDifficulty);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setGameCompleted(false);
    setCurrentDifficulty(difficulty);
    setShowInstructions(false);
    startGame('memory');

    // Start timer
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId)) {
      return;
    }

    const card = cards.find(c => c.id === cardId);
    if (!card || matchedPairs.includes(card.pairId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setMoves(prev => prev + 1);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards.map(id => cards.find(c => c.id === id)!);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, firstCard.pairId]);
          setFlippedCards([]);
          if (soundEnabled) playSound('correct');
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          if (soundEnabled) playSound('wrong');
        }, 1500);
      }
    }
  };

  const playSound = (type: 'correct' | 'wrong') => {
    if (!soundEnabled) return;

    // Simple Web Audio API for sound effects
    const AudioContextClass = window.AudioContext || (window as typeof window & {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const calculateScore = useCallback(() => {
    const baseScore = 1000;
    const timeBonus = Math.max(0, 300 - time); // Bonus for completing quickly
    const movesPenalty = moves * 10;
    return Math.max(0, baseScore + timeBonus - movesPenalty);
  }, [time, moves]);

  useEffect(() => {
    const totalPairs = getCardsForDifficulty(currentDifficulty).length / 2;
    if (matchedPairs.length === totalPairs) {
      setGameCompleted(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      updateScore(calculateScore());
    }
  }, [matchedPairs, updateScore, calculateScore, currentDifficulty]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startNewGame(currentDifficulty);
  };

  const handleGoHome = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    router.push('/');
  };

  const getDifficultyInfo = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return { pairs: 4, gridCols: 'grid-cols-4', description: '4 pairs • Perfect for beginners' };
      case 'medium': return { pairs: 6, gridCols: 'grid-cols-4', description: '6 pairs • Good challenge' };
      case 'hard': return { pairs: 8, gridCols: 'grid-cols-4', description: '8 pairs • For experts' };
    }
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Scripture Memory Game</h2>
            <p className="text-blue-200 text-lg">Match Bible verses with their references to strengthen your memory!</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-yellow-400" />
              How to Play
            </h3>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                <p>Click on cards to flip them and reveal Bible verses or references</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                <p>Find matching pairs - each verse matches with its Bible reference</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500/20 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                <p>Match all pairs to complete the level and earn points!</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 p-4 rounded-lg font-semibold text-lg"
              onClick={() => startNewGame('easy')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <span className="text-2xl mb-2 block">🌱</span>
                <div>Easy</div>
                <div className="text-sm opacity-75">4 pairs</div>
              </div>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 p-4 rounded-lg font-semibold text-lg"
              onClick={() => startNewGame('medium')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <span className="text-2xl mb-2 block">⚡</span>
                <div>Medium</div>
                <div className="text-sm opacity-75">6 pairs</div>
              </div>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 p-4 rounded-lg font-semibold text-lg"
              onClick={() => startNewGame('hard')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <span className="text-2xl mb-2 block">🔥</span>
                <div>Hard</div>
                <div className="text-sm opacity-75">8 pairs</div>
              </div>
            </motion.button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-full border-2 transition-colors ${
                soundEnabled ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-gray-500/20 border-gray-400 text-gray-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    const difficultyInfo = getDifficultyInfo(currentDifficulty);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Level Complete!</h2>
          <div className="space-y-3 mb-6">
            <p className="text-xl font-semibold">Score: {gameState.score}</p>
            <p className="text-lg">Moves: {moves}</p>
            <p className="text-lg">Time: {formatTime(time)}</p>
            <p className="text-sm text-blue-200">Difficulty: {currentDifficulty} ({difficultyInfo.pairs} pairs)</p>
          </div>
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
              onClick={() => setShowInstructions(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Change Level</span>
            </motion.button>
            <motion.button
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Scripture Memory</h1>
            <p className="text-blue-200">Match {getDifficultyInfo(currentDifficulty).pairs} pairs • {currentDifficulty} level</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span>Moves: {moves}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Time: {formatTime(time)}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full border transition-colors ${
                soundEnabled ? 'bg-green-500/20 border-green-400 text-green-300' : 'bg-gray-500/20 border-gray-400 text-gray-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Game Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`game-${currentDifficulty}`}
            className={`grid ${getGridCols(currentDifficulty)} gap-4 mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={`${card.id}-${currentDifficulty}-${index}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Card
                  card={card}
                  isFlipped={flippedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.pairId)}
                  onClick={() => handleCardClick(card.id)}
                  disabled={flippedCards.length === 2}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-blue-200 mb-4">
            Matched {matchedPairs.length} of {getDifficultyInfo(currentDifficulty).pairs} pairs
          </p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs.length / getDifficultyInfo(currentDifficulty).pairs) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
