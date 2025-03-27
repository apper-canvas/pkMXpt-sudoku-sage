import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import { BookOpen, Award, TrendingUp, Lightbulb } from 'lucide-react'

const Home = () => {
  const [showIntro, setShowIntro] = useState(true)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Master Sudoku Step by Step
              </h1>
              <p className="text-xl text-surface-600 dark:text-surface-300 mb-8">
                Learn the art of Sudoku with our progressive learning system, from beginner to expert
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowIntro(false)}
                className="btn btn-primary text-lg px-8 py-3"
              >
                Start Playing
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="card border-t-4 border-t-primary">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Progressive Learning</h3>
                    <p className="text-surface-600 dark:text-surface-300">
                      Start with simple 4×4 grids, then advance to 6×6, and finally master the classic 9×9 puzzles.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card border-t-4 border-t-secondary">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                    <TrendingUp className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Difficulty Levels</h3>
                    <p className="text-surface-600 dark:text-surface-300">
                      Each grid size offers three difficulty levels: Easy, Medium, and Hard to match your skill level.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card border-t-4 border-t-accent">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-lg">
                    <Lightbulb className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Helpful Hints</h3>
                    <p className="text-surface-600 dark:text-surface-300">
                      Stuck on a puzzle? Use our hint system to learn new techniques and improve your skills.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card border-t-4 border-t-primary-dark">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-dark/10 dark:bg-primary-dark/20 rounded-lg">
                    <Award className="text-primary-dark" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                    <p className="text-surface-600 dark:text-surface-300">
                      Monitor your improvement as you complete puzzles and unlock new challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sudoku Game</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowIntro(true)}
                className="btn btn-outline"
              >
                Back to Intro
              </motion.button>
            </div>
            
            <MainFeature />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home