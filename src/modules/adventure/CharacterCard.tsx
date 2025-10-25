// src/modules/adventure/CharacterCard.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StoryStage } from './data'

interface CharacterCardProps {
  stage: StoryStage
  onChoice: (choiceIndex: number) => void
  disabled: boolean
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  stage,
  onChoice,
  disabled,
}) => {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${stage.backgroundImage || '/images/default-bg.jpg'})`,
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-8">
        {/* Character Image */}
        {stage.characterImage && (
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={stage.characterImage}
              alt={`${stage.character} character`}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
          </motion.div>
        )}

        {/* Story Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          {stage.title}
        </h2>

        {/* Narrative Text */}
        <motion.p
          className="text-lg text-blue-100 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stage.narrative}
        </motion.p>

        {/* Choices */}
        <div className="space-y-4">
          {stage.choices.map((choice, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 rounded-lg font-semibold transition-all duration-300 ${
                disabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105'
              }`}
              onClick={() => !disabled && onChoice(index)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
            >
              {choice.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
