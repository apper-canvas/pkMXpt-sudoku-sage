import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, RefreshCw, CheckCircle, AlertTriangle, ChevronRight, ChevronLeft } from 'lucide-react'

// Generate a Sudoku puzzle of the specified size and difficulty
const generateSudokuPuzzle = (size, difficulty) => {
  // This is a simplified version for the MVP
  // In a real app, we would use a proper Sudoku generation algorithm
  
  // Create a solved board first
  const solution = Array(size).fill().map(() => Array(size).fill(0))
  
  // For 4x4, we'll use a simple pattern
  if (size === 4) {
    solution[0] = [1, 2, 3, 4]
    solution[1] = [3, 4, 1, 2]
    solution[2] = [2, 1, 4, 3]
    solution[3] = [4, 3, 2, 1]
  } 
  // For 6x6, another simple pattern
  else if (size === 6) {
    solution[0] = [1, 2, 3, 4, 5, 6]
    solution[1] = [4, 5, 6, 1, 2, 3]
    solution[2] = [2, 3, 1, 6, 4, 5]
    solution[3] = [5, 6, 4, 3, 1, 2]
    solution[4] = [3, 1, 2, 5, 6, 4]
    solution[5] = [6, 4, 5, 2, 3, 1]
  }
  // For 9x9, a valid Sudoku solution
  else {
    solution[0] = [5, 3, 4, 6, 7, 8, 9, 1, 2]
    solution[1] = [6, 7, 2, 1, 9, 5, 3, 4, 8]
    solution[2] = [1, 9, 8, 3, 4, 2, 5, 6, 7]
    solution[3] = [8, 5, 9, 7, 6, 1, 4, 2, 3]
    solution[4] = [4, 2, 6, 8, 5, 3, 7, 9, 1]
    solution[5] = [7, 1, 3, 9, 2, 4, 8, 5, 6]
    solution[6] = [9, 6, 1, 5, 3, 7, 2, 8, 4]
    solution[7] = [2, 8, 7, 4, 1, 9, 6, 3, 5]
    solution[8] = [3, 4, 5, 2, 8, 6, 1, 7, 9]
  }
  
  // Create a puzzle by removing numbers from the solution
  const puzzle = JSON.parse(JSON.stringify(solution))
  
  // Determine how many cells to reveal based on difficulty
  let cellsToReveal
  if (difficulty === 'easy') {
    cellsToReveal = Math.floor(size * size * 0.6) // 60% filled
  } else if (difficulty === 'medium') {
    cellsToReveal = Math.floor(size * size * 0.5) // 50% filled
  } else {
    cellsToReveal = Math.floor(size * size * 0.4) // 40% filled
  }
  
  // Create a list of all cell positions
  const positions = []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push([i, j])
    }
  }
  
  // Shuffle the positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }
  
  // Clear cells that should be empty
  const cellsToEmpty = size * size - cellsToReveal
  for (let i = 0; i < cellsToEmpty; i++) {
    const [row, col] = positions[i]
    puzzle[row][col] = 0
  }
  
  return { puzzle, solution }
}

const MainFeature = () => {
  const [gridSize, setGridSize] = useState(4)
  const [difficulty, setDifficulty] = useState('easy')
  const [board, setBoard] = useState([])
  const [solution, setSolution] = useState([])
  const [selectedCell, setSelectedCell] = useState(null)
  const [userInputs, setUserInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [hintCell, setHintCell] = useState(null)
  
  // Initialize or reset the game
  const initializeGame = () => {
    const { puzzle, solution } = generateSudokuPuzzle(gridSize, difficulty)
    setBoard(puzzle)
    setSolution(solution)
    setUserInputs({})
    setErrors({})
    setIsComplete(false)
    setSelectedCell(null)
    setShowHint(false)
    setHintCell(null)
  }
  
  // Initialize game when component mounts or when grid size/difficulty changes
  useEffect(() => {
    initializeGame()
  }, [gridSize, difficulty])
  
  // Check if the puzzle is complete
  useEffect(() => {
    if (board.length === 0) return
    
    let complete = true
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellKey = `${row}-${col}`
        
        // If the cell is empty in the original puzzle
        if (board[row][col] === 0) {
          // Check if user has filled it correctly
          if (!userInputs[cellKey] || userInputs[cellKey] !== solution[row][col]) {
            complete = false
            break
          }
        }
      }
      if (!complete) break
    }
    
    setIsComplete(complete)
  }, [board, userInputs, solution, gridSize])
  
  // Handle cell selection
  const handleCellClick = (row, col) => {
    // Only allow selection of empty cells
    if (board[row][col] === 0) {
      setSelectedCell([row, col])
      setShowHint(false)
    }
  }
  
  // Handle number input
  const handleNumberInput = (num) => {
    if (!selectedCell) return
    
    const [row, col] = selectedCell
    const cellKey = `${row}-${col}`
    
    // Update user inputs
    const newUserInputs = { ...userInputs }
    newUserInputs[cellKey] = num
    setUserInputs(newUserInputs)
    
    // Check if the input is correct
    const newErrors = { ...errors }
    if (num !== solution[row][col]) {
      newErrors[cellKey] = true
    } else {
      delete newErrors[cellKey]
    }
    setErrors(newErrors)
  }
  
  // Clear the selected cell
  const clearSelectedCell = () => {
    if (!selectedCell) return
    
    const [row, col] = selectedCell
    const cellKey = `${row}-${col}`
    
    // Remove user input and error for this cell
    const newUserInputs = { ...userInputs }
    delete newUserInputs[cellKey]
    setUserInputs(newUserInputs)
    
    const newErrors = { ...errors }
    delete newErrors[cellKey]
    setErrors(newErrors)
  }
  
  // Get a hint for an empty cell
  const getHint = () => {
    // Find an empty cell that hasn't been filled correctly
    const emptyCells = []
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellKey = `${row}-${col}`
        
        if (board[row][col] === 0 && 
            (!userInputs[cellKey] || userInputs[cellKey] !== solution[row][col])) {
          emptyCells.push([row, col])
        }
      }
    }
    
    if (emptyCells.length > 0) {
      // Pick a random empty cell
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      const [row, col] = emptyCells[randomIndex]
      
      setHintCell([row, col])
      setShowHint(true)
      setHintsUsed(hintsUsed + 1)
    }
  }
  
  // Apply the hint
  const applyHint = () => {
    if (!hintCell) return
    
    const [row, col] = hintCell
    const cellKey = `${row}-${col}`
    
    // Update user inputs with the correct value
    const newUserInputs = { ...userInputs }
    newUserInputs[cellKey] = solution[row][col]
    setUserInputs(newUserInputs)
    
    // Remove any error for this cell
    const newErrors = { ...errors }
    delete newErrors[cellKey]
    setErrors(newErrors)
    
    setShowHint(false)
    setHintCell(null)
  }
  
  // Determine the box size for grid styling
  const getBoxSize = () => {
    if (gridSize === 4) return 2
    if (gridSize === 6) return 2
    return 3
  }
  
  const boxSize = getBoxSize()
  
  // Determine if a cell is in the same row, column, or box as the selected cell
  const isRelatedToSelected = (row, col) => {
    if (!selectedCell) return false
    
    const [selectedRow, selectedCol] = selectedCell
    
    // Same row or column
    if (row === selectedRow || col === selectedCol) return true
    
    // Same box
    const boxRow = Math.floor(row / boxSize)
    const boxCol = Math.floor(col / boxSize)
    const selectedBoxRow = Math.floor(selectedRow / boxSize)
    const selectedBoxCol = Math.floor(selectedCol / boxSize)
    
    return boxRow === selectedBoxRow && boxCol === selectedBoxCol
  }
  
  // Get the cell class based on its state
  const getCellClass = (row, col) => {
    const cellKey = `${row}-${col}`
    const isSelected = selectedCell && selectedRow === row && selectedCol === col
    const isHinted = hintCell && hintCell[0] === row && hintCell[1] === col
    const hasError = errors[cellKey]
    const isFixed = board[row][col] !== 0
    const isUserInput = userInputs[cellKey] !== undefined
    const isHighlighted = isRelatedToSelected(row, col)
    
    let className = "flex items-center justify-center cursor-pointer transition-all duration-200 "
    
    // Border styling
    className += "border border-surface-300 dark:border-surface-600 "
    
    // Right border for box separation
    if ((col + 1) % boxSize === 0 && col !== gridSize - 1) {
      className += "border-r-2 border-r-surface-400 dark:border-r-surface-500 "
    }
    
    // Bottom border for box separation
    if ((row + 1) % boxSize === 0 && row !== gridSize - 1) {
      className += "border-b-2 border-b-surface-400 dark:border-b-surface-500 "
    }
    
    // Cell state styling
    if (isSelected) {
      className += "bg-primary/30 dark:bg-primary/40 "
    } else if (isHinted && showHint) {
      className += "bg-accent/30 dark:bg-accent/40 animate-pulse "
    } else if (hasError) {
      className += "sudoku-cell-error "
    } else if (isHighlighted) {
      className += "sudoku-cell-highlight "
    }
    
    // Text styling
    if (isFixed) {
      className += "sudoku-cell-fixed "
    } else if (isUserInput) {
      className += "sudoku-cell-user "
    }
    
    return className
  }
  
  // Get the cell value
  const getCellValue = (row, col) => {
    const cellKey = `${row}-${col}`
    
    if (board[row][col] !== 0) {
      return board[row][col]
    }
    
    if (userInputs[cellKey]) {
      return userInputs[cellKey]
    }
    
    return ""
  }
  
  // Destructure selected cell for easier access
  const selectedRow = selectedCell ? selectedCell[0] : null
  const selectedCol = selectedCell ? selectedCell[1] : null
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Grid Size</h3>
          <div className="flex gap-2">
            {[4, 6, 9].map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGridSize(size)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  gridSize === size 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {size}×{size}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Difficulty</h3>
          <div className="flex gap-2">
            {['easy', 'medium', 'hard'].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 px-3 rounded-lg capitalize transition-colors ${
                  difficulty === level 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Controls</h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initializeGame}
              className="flex-1 py-2 px-3 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 flex items-center justify-center gap-1"
              title="New Game"
            >
              <RefreshCw size={16} />
              <span>New</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={getHint}
              disabled={isComplete}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1 ${
                isComplete 
                  ? 'bg-surface-200 dark:bg-surface-800 text-surface-400 cursor-not-allowed' 
                  : 'bg-accent text-white hover:bg-amber-600'
              }`}
              title="Get Hint"
            >
              <HelpCircle size={16} />
              <span>Hint</span>
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-auto">
          <div className="relative">
            <div 
              className={`grid gap-0 mx-auto bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-card border-2 border-surface-300 dark:border-surface-600 ${
                isComplete ? 'border-green-500 dark:border-green-500' : ''
              }`}
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                width: `${Math.min(gridSize * 3, 24)}rem`
              }}
            >
              {board.map((row, rowIndex) => (
                row.map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={getCellClass(rowIndex, colIndex)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    style={{ 
                      height: `${Math.min(gridSize * 0.75, 6)}rem`,
                      fontSize: `${gridSize <= 4 ? '1.5rem' : gridSize <= 6 ? '1.25rem' : '1rem'}`
                    }}
                  >
                    {getCellValue(rowIndex, colIndex)}
                  </div>
                ))
              ))}
              
              {isComplete && (
                <div className="absolute inset-0 bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center rounded-xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="bg-white dark:bg-surface-800 p-4 rounded-xl shadow-lg text-center"
                  >
                    <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
                    <h3 className="text-xl font-bold mb-1">Puzzle Complete!</h3>
                    <p className="text-surface-600 dark:text-surface-300 mb-3">
                      Great job! You've solved the puzzle.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={initializeGame}
                      className="btn btn-primary"
                    >
                      New Puzzle
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>
            
            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>There are {Object.keys(errors).length} incorrect cells. Keep trying!</span>
              </div>
            )}
            
            {showHint && hintCell && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-accent/20 dark:bg-accent/30 text-accent-dark dark:text-accent rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={18} />
                    <span>Hint available for highlighted cell</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyHint}
                    className="btn btn-accent py-1 px-3 text-sm"
                  >
                    Apply Hint
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Number Pad</h3>
            
            <div 
              className="grid gap-2 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${Math.min(gridSize, 5)}, minmax(0, 1fr))`,
                maxWidth: `${Math.min(gridSize, 5) * 3}rem`
              }}
            >
              {Array.from({ length: gridSize }, (_, i) => i + 1).map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberInput(num)}
                  disabled={!selectedCell}
                  className={`p-3 rounded-lg text-lg font-medium ${
                    !selectedCell 
                      ? 'bg-surface-200 dark:bg-surface-800 text-surface-400 cursor-not-allowed' 
                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-primary hover:text-white'
                  }`}
                >
                  {num}
                </motion.button>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearSelectedCell}
                disabled={!selectedCell}
                className={`p-3 rounded-lg text-lg font-medium ${
                  !selectedCell 
                    ? 'bg-surface-200 dark:bg-surface-800 text-surface-400 cursor-not-allowed' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                }`}
                style={{ 
                  gridColumn: `span ${Math.min(gridSize, 5)}`
                }}
              >
                Clear
              </motion.button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <h4 className="font-medium mb-2">Game Stats</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Grid Size:</span>
                  <span className="font-medium">{gridSize}×{gridSize}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Difficulty:</span>
                  <span className="font-medium capitalize">{difficulty}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Hints Used:</span>
                  <span className="font-medium">{hintsUsed}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Errors:</span>
                  <span className="font-medium">{Object.keys(errors).length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Progress:</span>
                  <span className="font-medium">
                    {Object.keys(userInputs).length} / {board.flat().filter(cell => cell === 0).length}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <h4 className="font-medium mb-2">Learning Path</h4>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <ChevronLeft size={16} className="text-surface-400" />
                  <span className={gridSize === 4 ? 'font-medium' : 'text-surface-400'}>4×4</span>
                </div>
                <div className="h-1 flex-1 mx-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ 
                      width: `${gridSize === 4 ? '33%' : gridSize === 6 ? '66%' : '100%'}`
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className={gridSize === 6 ? 'font-medium' : 'text-surface-400'}>6×6</span>
                </div>
                <div className="h-1 flex-1 mx-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ 
                      width: `${gridSize === 4 ? '0%' : gridSize === 6 ? '50%' : '100%'}`
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className={gridSize === 9 ? 'font-medium' : 'text-surface-400'}>9×9</span>
                  <ChevronRight size={16} className="text-surface-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFeature