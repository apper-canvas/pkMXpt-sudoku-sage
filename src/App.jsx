import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Moon, Sun, BookOpen, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import SudokuGuide from './pages/SudokuGuide'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SudokuSage
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.Link
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              to="/"
              className="flex items-center gap-1 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </motion.Link>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/guide"
              className="flex items-center gap-1 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Sudoku Guide</span>
            </motion.a>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<SudokuGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="py-4 px-6 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto text-center text-sm text-surface-500">
          &copy; {new Date().getFullYear()} SudokuSage. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App