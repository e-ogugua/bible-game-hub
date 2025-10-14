import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import React Three Fiber components to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D').then(mod => ({ default: mod.Scene3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  )
});

const BurningBush = dynamic(() => import('@/components/scenes/BurningBush').then(mod => ({ default: mod.BurningBush })), { ssr: false });
const RedSea = dynamic(() => import('@/components/scenes/RedSea').then(mod => ({ default: mod.RedSea })), { ssr: false });
const GoliathScene = dynamic(() => import('@/components/scenes/GoliathScene').then(mod => ({ default: mod.GoliathScene })), { ssr: false });
const HarpScene = dynamic(() => import('@/components/scenes/HarpScene').then(mod => ({ default: mod.HarpScene })), { ssr: false });
const HealingScene = dynamic(() => import('@/components/scenes/HealingScene').then(mod => ({ default: mod.HealingScene })), { ssr: false });
const ResurrectionScene = dynamic(() => import('@/components/scenes/ResurrectionScene').then(mod => ({ default: mod.ResurrectionScene })), { ssr: false });

interface StorySceneProps {
  character: string;
  chapter: number;
}

export const StoryScene: React.FC<StorySceneProps> = ({ character, chapter }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const getSceneForChapter = () => {
    switch (character) {
      case 'moses':
        return chapter === 1 ? <BurningBush /> : <RedSea />;
      case 'david':
        return chapter === 2 ? <GoliathScene /> : <HarpScene />;
      case 'jesus':
        return chapter === 5 ? <ResurrectionScene /> : <HealingScene />;
      default:
        return <BurningBush />;
    }
  };

  return (
    <div className="relative">
      {/* Divine Background Atmosphere */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Soft ray effects */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-yellow-400/50 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/3 w-px h-24 bg-gradient-to-b from-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 right-1/4 w-px h-40 bg-gradient-to-b from-purple-400/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Subtle background particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + (i % 4) * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Divine glow overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent animate-pulse" />
      </motion.div>

      {/* Main 3D Scene */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Scene3D className="rounded-lg overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${character}-${chapter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getSceneForChapter()}
            </motion.div>
          </AnimatePresence>
        </Scene3D>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Scene transition overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* Parallax background elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '10% 10%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  );
};
