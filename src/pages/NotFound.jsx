import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <div className="inline-block p-6 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
            <span className="text-6xl">🧩</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-300 mb-8">
            Oops! It seems like the puzzle piece you're looking for is missing. Let's get you back to the main board.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Home size={18} />
              Return Home
            </motion.button>
          </Link>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32 mx-auto opacity-50">
            {Array(9).fill().map((_, i) => (
              <div 
                key={i} 
                className={`bg-surface-300 dark:bg-surface-600 rounded ${i === 4 ? 'animate-pulse bg-primary' : ''}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">404</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound