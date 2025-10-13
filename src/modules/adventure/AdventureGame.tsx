// src/modules/adventure/AdventureGame.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameContext } from '@/contexts/GameContext';
import { adventureData, getStartingStage } from './data';
import { CharacterCard } from './CharacterCard';

type Character = 'moses' | 'david' | 'jesus';

export const AdventureGame: React.FC = () => {
  const { gameState, startGame, updateScore } = useGameContext();
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentGame) {
      startGame('adventure');
    }
  }, [gameState.gameStarted, gameState.currentGame, startGame]);

  const startAdventure = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentStage(getStartingStage(character));
    setPlayerChoices([]);
    setGameCompleted(false);
    setFinalScore(0);
    startGame('adventure');
  };

  const handleChoice = (choiceIndex: number) => {
    if (!currentStage) return;

    const stage = adventureData[currentStage];
    const choice = stage.choices[choiceIndex];

    // Update score
    updateScore(gameState.score + choice.scoreImpact);
    setFinalScore(prev => prev + choice.scoreImpact);

    // Track choice for summary
    setPlayerChoices(prev => [...prev, choice.text]);

    if (choice.endGame) {
      setGameCompleted(true);
    } else if (choice.nextStage) {
      setCurrentStage(choice.nextStage);
    }
  };

  const handleReplay = () => {
    if (selectedCharacter) {
      startAdventure(selectedCharacter);
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getCharacterReflection = (character: Character): string => {
    switch (character) {
      case 'moses':
        return 'Like Moses, you were called to lead and trust in God\'s plan. Remember, "The Lord is my strength and my defense; he has become my salvation." (Exodus 15:2)';
      case 'david':
        return 'David\'s faith in God\'s power over human strength teaches us that "The Lord who delivered me from the paw of the lion and the paw of the bear will deliver me from the hand of this Philistine." (1 Samuel 17:37)';
      case 'jesus':
        return 'Jesus\' resistance to temptation shows us that "Man shall not live by bread alone, but by every word that comes from the mouth of God." (Matthew 4:4)';
      default:
        return 'Your journey through these stories reminds us of God\'s faithfulness throughout history.';
    }
  };

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">Choose Your Biblical Adventure</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {(['moses', 'david', 'jesus'] as Character[]).map((character) => (
              <motion.button
                key={character}
                className="p-6 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => startAdventure(character)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold capitalize mb-2">{character}</h3>
                  <p className="text-sm text-blue-100">
                    {character === 'moses' && 'From Egypt to the Burning Bush'}
                    {character === 'david' && 'The Battle with Goliath'}
                    {character === 'jesus' && 'Temptation in the Wilderness'}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Adventure Complete!</h2>
          <p className="text-xl mb-6">Final Score: {finalScore}</p>
          
          <div className="bg-white/5 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-lg font-semibold mb-4">Your Journey Summary:</h3>
            <ul className="space-y-2">
              {playerChoices.map((choice, index) => (
                <li key={index} className="text-blue-100">• {choice}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Biblical Reflection:</h3>
            <p className="text-purple-100">{getCharacterReflection(selectedCharacter)}</p>
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

  const stage = currentStage ? adventureData[currentStage] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 capitalize">{selectedCharacter} Adventure</h1>
          <p className="text-blue-200">Current Score: {gameState.score}</p>
        </motion.div>

        {/* Story Card */}
        {stage && (
          <CharacterCard
            stage={stage}
            onChoice={handleChoice}
            disabled={gameState.gameStarted && !gameState.currentGame}
          />
        )}
      </div>
    </div>
  );
};
