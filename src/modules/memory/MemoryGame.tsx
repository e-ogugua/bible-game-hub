'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Clock, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameContext } from '@/contexts/GameContext';
import { MemoryCard, shuffleCards } from './data';
import { Card } from './Card';

export const MemoryGame: React.FC = () => {
  const { gameState, startGame, updateScore } = useGameContext();
  const router = useRouter();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('memory');
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame]);

  const startNewGame = () => {
    const shuffledCards = shuffleCards();
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setGameStarted(true);
    setGameCompleted(false);
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
          playSound('correct');
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          playSound('wrong');
        }, 1500);
      }
    }
  };

  const playSound = (type: 'correct' | 'wrong') => {
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
    if (matchedPairs.length === 24) {
      setGameCompleted(true);
      setGameStarted(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      updateScore(calculateScore());
    }
  }, [matchedPairs, updateScore, calculateScore]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startNewGame();
  };

  const handleGoHome = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    router.push('/');
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Target className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Game Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl">Score: {gameState.score}</p>
            <p className="text-lg">Moves: {moves}</p>
            <p className="text-lg">Time: {formatTime(time)}</p>
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
            <h1 className="text-4xl font-bold mb-2">Memory Verse Game</h1>
            <p className="text-blue-200">Match Bible verses with their references</p>
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
          </div>
        </motion.div>

        {/* Game Board */}
        {!gameStarted && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
              onClick={startNewGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        )}

        {gameStarted && (
          <motion.div
            className="grid grid-cols-6 gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isFlipped={flippedCards.includes(card.id)}
                isMatched={matchedPairs.includes(card.pairId)}
                onClick={() => handleCardClick(card.id)}
                disabled={flippedCards.length === 2}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
