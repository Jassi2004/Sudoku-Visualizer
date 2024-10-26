import { useEffect, useCallback, useState } from 'react';
import { useSudokuSolver } from './hooks/useSudokuSolver';
import Board from './components/Board'; // Use Board component instead of direct Cell import
import Controls from './components/Controls';

const initialBoard = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({ value: null, status: 'normal' }))
);

const App = () => {
  const [speed, setSpeed] = useState(1); // Add speed state
  const { board, isSolving, startSolving, generatePuzzle } = useSudokuSolver(initialBoard, speed);

  // Use useCallback to prevent infinite loop
  const memoizedGeneratePuzzle = useCallback((difficulty) => {
    generatePuzzle(difficulty);
  }, [generatePuzzle]);

  useEffect(() => {
    memoizedGeneratePuzzle('medium');
  }, [memoizedGeneratePuzzle]);

  return (
    <>
      <div className="flex flex-col items-center p-4 gap-4">
        <h1 className="text-4xl font-bold">Sudoku Visualizer</h1>
        <Board board={board} />
        <Controls
          generatePuzzle={generatePuzzle}
          startSolving={startSolving}
          isSolving={isSolving}
          setSpeed={setSpeed}
        />
      </div>
    </>
  );
};

export default App;
