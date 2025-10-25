import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Trophy,
  Zap,
  Star,
  Heart,
  Shield,
  Crown,
} from 'lucide-react'

export const FaithVerse: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: '3D Bible Stories',
      description:
        'Immerse yourself in interactive biblical narratives with stunning 3D visuals',
      status: 'Coming Soon',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Users,
      title: 'Character Collections',
      description:
        'Collect and upgrade biblical heroes with unique abilities and stories',
      status: 'Coming Soon',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description:
        'Unlock rewards, badges, and milestones as you progress through your faith journey',
      status: 'Coming Soon',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Zap,
      title: 'Divine Powers',
      description:
        'Master spiritual abilities and use them to overcome challenges in epic adventures',
      status: 'Coming Soon',
      color: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent">
            FaithVerse
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            The ultimate biblical metaverse where faith comes alive through
            immersive 3D experiences, character collections, and epic spiritual
            adventures.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full mb-6 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Status badge */}
              <div className="absolute top-4 right-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm font-medium">
                {feature.status}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 border-2 border-yellow-400/0 group-hover:border-yellow-400/50 rounded-xl transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Community Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            FaithVerse Community
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-green-300 transition-colors">
                  Global Missions
                </h3>
                <p className="text-blue-100 text-sm mb-4 text-center">
                  Join worldwide faith challenges and compete with believers
                  across the globe.
                </p>
                <div className="text-center">
                  <span className="inline-block bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-xs">
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-purple-300 transition-colors">
                  Faith Challenges
                </h3>
                <p className="text-blue-100 text-sm mb-4 text-center">
                  Weekly spiritual challenges to grow your faith and earn
                  exclusive rewards.
                </p>
                <div className="text-center">
                  <span className="inline-block bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-xs">
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-blue-300 transition-colors">
                  Bible Study Circles
                </h3>
                <p className="text-blue-100 text-sm mb-4 text-center">
                  Join virtual study groups and share insights with fellow
                  Scripture enthusiasts.
                </p>
                <div className="text-center">
                  <span className="inline-block bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs">
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Community CTA */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 opacity-75 cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Join Early Access</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.button>

            <p className="text-sm text-blue-200 mt-3">
              Be the first to experience community features when they launch!
            </p>
          </motion.div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">The Journey Begins Soon</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            FaithVerse is evolving from our current Bible Game Hub into a
            comprehensive biblical metaverse. Stay tuned for updates as we build
            the future of faith-based gaming.
          </p>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-300">Stories Enhanced</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-blue-300">Audio System</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-purple-300">FaithVerse Portal</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">3D Stories</span>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6">
            <p className="text-white text-lg">
              🚀 <strong>Ready to explore?</strong> Try our enhanced Bible
              stories with 3D visuals and audio now!
            </p>
          </div>

          {/* Join FaithVerse CTA */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-yellow-300 to-purple-300 bg-clip-text">
              Join the FaithVerse
            </h3>

            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Be among the first to experience the future of biblical gaming.
              Get early access to new features and help shape the FaithVerse
              community.
            </p>

            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 opacity-75 cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              <div className="flex items-center space-x-2">
                <span>Coming Soon</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ⏳
                </motion.div>
              </div>
            </motion.button>

            <p className="text-xs text-blue-200 mt-3">
              Sign up for our newsletter to be notified when FaithVerse
              launches!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
