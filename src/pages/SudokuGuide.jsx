import { motion } from 'framer-motion'

// Import images
import sudokuBoard from '../assets/images/sudoku-board.png'
import sudokuRules from '../assets/images/sudoku-rules.png'
import scanningTechnique from '../assets/images/scanning-technique.png'
import crosshatching from '../assets/images/crosshatching.png'
import pencilMarking from '../assets/images/pencil-marking.png'
import nakedPairs from '../assets/images/naked-pairs.png'
import hiddenPairs from '../assets/images/hidden-pairs.png'
import xWing from '../assets/images/x-wing.png'
import swordfish from '../assets/images/swordfish.png'
import difficultyLevels from '../assets/images/difficulty-levels.png'

// Image component for consistent styling
const GuideImage = ({ src, alt, caption }) => (
  <div className="my-4">
    <img 
      src={src} 
      alt={alt} 
      className="rounded-lg shadow-md border border-surface-200 dark:border-surface-700 w-full object-cover hover:shadow-lg transition-shadow duration-300" 
    />
    {caption && (
      <p className="mt-2 text-sm text-center text-surface-600 dark:text-surface-400 italic">
        {caption}
      </p>
    )}
  </div>
)

const SudokuGuide = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-8">Sudoku Guide: Rules &amp; Strategies</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* What is Sudoku */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">What is Sudoku?</h2>
              <p className="mb-4">
                Sudoku is a logic-based number placement puzzle that originated in Switzerland and gained worldwide 
                popularity in Japan during the 1980s. The name "Sudoku" is an abbreviation of a Japanese phrase 
                meaning "the digits must remain single."
              </p>
              
              <GuideImage 
                src={sudokuBoard} 
                alt="Standard 9x9 Sudoku grid" 
                caption="A standard 9×9 Sudoku grid with some cells filled in as starting clues" 
              />
              
              <p>
                The classic Sudoku puzzle consists of a 9×9 grid divided into nine 3×3 subgrids (also called boxes or regions). 
                Some cells already contain numbers, known as "givens" or "clues." The objective is to fill the remaining empty 
                cells with digits from 1 to 9, ensuring that each digit appears exactly once in each row, column, and 3×3 box.
              </p>
            </section>
            
            {/* Rules of Sudoku */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Rules of Sudoku</h2>
              <div className="md:flex md:space-x-6">
                <div className="md:w-1/2">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each row must contain the digits 1-9 without repetition</li>
                    <li>Each column must contain the digits 1-9 without repetition</li>
                    <li>Each of the nine 3×3 boxes must contain the digits 1-9 without repetition</li>
                    <li>The puzzle has only one valid solution</li>
                  </ul>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                  <GuideImage 
                    src={sudokuRules} 
                    alt="Sudoku rules visualization" 
                    caption="The three fundamental rules: unique numbers in each row, column, and 3×3 box" 
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <h3 className="font-semibold mb-2">Variants</h3>
                <p>
                  While the classic Sudoku is 9×9, there are many variants:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li><span className="font-medium">4×4 (Mini Sudoku)</span>: Uses digits 1-4, with 2×2 boxes. Perfect for beginners and children.</li>
                  <li><span className="font-medium">6×6</span>: Uses digits 1-6, with 2×3 or 3×2 boxes. A good intermediate step.</li>
                  <li><span className="font-medium">16×16 (Super Sudoku)</span>: Uses digits 1-9 and letters A-G, with 4×4 boxes. For experts.</li>
                </ul>
              </div>
            </section>
            
            {/* Solving Techniques: Basic */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Solving Techniques: Basic</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">1. Scanning</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p className="mb-2">
                      Scanning involves checking rows, columns, and boxes systematically to identify 
                      where a specific number can be placed.
                    </p>
                    <ul className="list-disc pl-6">
                      <li><span className="font-medium">Row Scanning</span>: Look for a specific digit across all rows</li>
                      <li><span className="font-medium">Column Scanning</span>: Look for a specific digit down all columns</li>
                      <li><span className="font-medium">Box Scanning</span>: Check each 3×3 box for a specific digit</li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={scanningTechnique} 
                      alt="Scanning technique visualization" 
                      caption="Scanning rows, columns, and boxes to find possible placements for the number 5" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">2. Crosshatching</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p className="mb-2">
                      Crosshatching combines row and column scanning to pinpoint the exact cell where a number 
                      must be placed within a box.
                    </p>
                    <p>
                      Look at a specific 3×3 box. For a given number, check which rows and columns already contain 
                      that number outside the box. The intersections of the remaining rows and columns within the box 
                      are potential positions for that number.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={crosshatching} 
                      alt="Crosshatching technique visualization" 
                      caption="Using crosshatching to determine the only possible position for the number 7 in a box" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">3. Pencil Marking</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p>
                      Pencil marking (or "candidates") involves noting all possible values for each empty cell. 
                      As you solve more cells, you can eliminate candidates until only one remains.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={pencilMarking} 
                      alt="Pencil marking example" 
                      caption="A Sudoku grid with pencil marks showing candidate numbers for empty cells" 
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Solving Techniques: Intermediate */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Solving Techniques: Intermediate</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">1. Naked Pairs/Triples</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p className="mb-2">
                      When two cells in the same row, column, or box contain the same two candidates and nothing else, 
                      those candidates can be eliminated from all other cells in that row, column, or box.
                    </p>
                    <p>
                      Example: If cells A and B in a row both have only candidates 4 and 7, then no other cell in that 
                      row can contain 4 or 7.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={nakedPairs} 
                      alt="Naked pairs example" 
                      caption="A naked pair of 4,7 in two cells of a row, allowing us to eliminate 4 and 7 as candidates in other cells of that row" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">2. Hidden Pairs/Triples</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p className="mb-2">
                      When two candidates appear in only two cells within a row, column, or box, all other candidates 
                      can be removed from those two cells.
                    </p>
                    <p>
                      Example: If candidates 3 and 8 appear only in cells X and Y in a column (along with other candidates), 
                      then cells X and Y must contain 3 and 8, and all other candidates can be removed from these cells.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={hiddenPairs} 
                      alt="Hidden pairs example" 
                      caption="A hidden pair of 3,8 in two cells of a column, allowing us to remove all other candidates from these cells" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">3. Pointing Pairs/Triples</h3>
                <p>
                  When a candidate appears only in two or three cells within a box, and these cells are all in the same 
                  row or column, that candidate can be eliminated from other cells in that row or column outside the box.
                </p>
              </div>
            </section>
            
            {/* Solving Techniques: Advanced */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Solving Techniques: Advanced</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">1. X-Wing</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p className="mb-2">
                      When a candidate appears exactly twice in each of two different rows, and these candidates are aligned 
                      in the same columns, the candidate can be eliminated from other cells in those columns.
                    </p>
                    <p>
                      The same applies to columns: if a candidate appears exactly twice in each of two different columns, 
                      and these candidates align in the same rows, the candidate can be eliminated from other cells in those rows.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={xWing} 
                      alt="X-Wing pattern example" 
                      caption="An X-Wing pattern formed by the candidate 5 in four cells, allowing for elimination in other cells" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">2. Swordfish</h3>
                <div className="md:flex md:space-x-6">
                  <div className="md:w-1/2">
                    <p>
                      Similar to X-Wing but involves three rows and three columns. When a candidate appears in 2-3 cells in 
                      each of three different rows, and these candidates align in exactly three columns, the candidate can be 
                      eliminated from other cells in those columns.
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <GuideImage 
                      src={swordfish} 
                      alt="Swordfish pattern example" 
                      caption="A Swordfish pattern formed by the candidate 3 in three rows and three columns" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">3. Forcing Chains</h3>
                <p>
                  This technique involves following a logical chain of implications. If cell A contains value X, then 
                  cell B must contain value Y, which means cell C must contain value Z, and so on. If this chain leads 
                  to a contradiction, then cell A cannot contain value X.
                </p>
              </div>
            </section>
          </div>
          
          <div className="space-y-8">
            {/* Tips for Success */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h3 className="font-semibold">Start with the obvious</h3>
                      <p className="text-surface-600 dark:text-surface-300">Fill in cells that have only one possible value.</p>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h3 className="font-semibold">Use pencil marks</h3>
                      <p className="text-surface-600 dark:text-surface-300">Note all possible values for each cell to track candidates.</p>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h3 className="font-semibold">Look for forced moves</h3>
                      <p className="text-surface-600 dark:text-surface-300">Identify cells where only one number can go due to constraints.</p>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h3 className="font-semibold">Work systematically</h3>
                      <p className="text-surface-600 dark:text-surface-300">Move from simple techniques to more complex ones as needed.</p>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                    <div>
                      <h3 className="font-semibold">Take a break</h3>
                      <p className="text-surface-600 dark:text-surface-300">If stuck, step away and return with fresh eyes.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
            
            {/* Common Patterns */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Common Patterns</h2>
              <p className="mb-4">
                Recognizing these patterns can help you solve puzzles faster:
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <h3 className="font-semibold text-primary">Box-Line Reduction</h3>
                  <p className="text-sm">When a candidate appears only in one row or column within a box, it can be eliminated from that same row or column in other boxes.</p>
                </div>
                
                <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <h3 className="font-semibold text-primary">Y-Wing</h3>
                  <p className="text-sm">A pattern involving three cells forming a "Y" shape that allows for elimination of candidates in cells that see the "wing" cells.</p>
                </div>
                
                <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <h3 className="font-semibold text-primary">XYZ-Wing</h3>
                  <p className="text-sm">An extension of the Y-Wing pattern involving three candidates in three cells, allowing for additional eliminations.</p>
                </div>
              </div>
            </section>
            
            {/* Difficulty Levels */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Difficulty Levels</h2>
              
              <GuideImage 
                src={difficultyLevels} 
                alt="Sudoku difficulty levels" 
                caption="Examples of puzzles across different difficulty levels, from easy to expert" 
              />
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">Easy</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    Can be solved using only basic techniques like scanning and single candidates. 
                    Many givens (typically 35+ in a 9×9 puzzle).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">Medium</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    Requires techniques like naked/hidden pairs and pointing pairs. 
                    Moderate number of givens (28-35 in a 9×9 puzzle).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-orange-600 dark:text-orange-400">Hard</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    Requires advanced techniques like X-Wing, XY-Wing, or Swordfish. 
                    Fewer givens (24-28 in a 9×9 puzzle).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-red-600 dark:text-red-400">Expert</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    Requires very advanced techniques like Swordfish, Forcing Chains, or trial and error. 
                    Minimal givens (20-24 in a 9×9 puzzle).
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SudokuGuide