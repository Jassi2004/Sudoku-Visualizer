import { useCallback, useState } from "react";
import generateFullBoard from "../utils/generateFullBoard";
import createPuzzle from "../utils/createPuzzle";
import isValidPlacement from "../utils/isValidPlacement";

export function useSudokuSolver(initialBoard, speed = 50) {
    const [board, setBoard] = useState(initialBoard);
    const [isSolving, setIsSolving] = useState(false);

    // Define the delay function
    const delay = useCallback((ms) => new Promise(resolve => setTimeout(resolve, ms)), []);

    // Deep clone the board to prevent mutations
    const cloneBoard = useCallback((board) =>
        board.map(row => row.map(cell => ({ ...cell }))),
        []);

    const generatePuzzle = useCallback((difficulty = 'medium') => {
        const emptyBoard = cloneBoard(initialBoard);
        const fullBoard = generateFullBoard(emptyBoard);
        const puzzle = createPuzzle(cloneBoard(fullBoard), difficulty);
        setBoard(puzzle);
    }, [initialBoard, cloneBoard]);

    const solveBoard = useCallback(async (boardToSolve) => {
        const currentBoard = cloneBoard(boardToSolve);
        const delayTime = Math.max(10, Math.floor(1000 / speed));


        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (currentBoard[row][col].value === null) {
                    for (let num = 1; num <= 9; num++) {
                        // Pass setBoard as an argument to isValidPlacement
                        if (isValidPlacement(currentBoard, row, col, num, setBoard)) {
                            currentBoard[row][col] = { value: num, status: 'correct' };
                            setBoard(cloneBoard(currentBoard));

                            await delay(delayTime);

                            if (await solveBoard(currentBoard)) return true;

                            currentBoard[row][col] = { value: null, status: 'incorrect' };
                            setBoard(cloneBoard(currentBoard));
                            await delay(delayTime);
                        } else {
                            currentBoard[row][col] = { value: num, status: 'incorrect' };
                            setBoard(cloneBoard(currentBoard));
                            await delay(delayTime);
                            currentBoard[row][col] = { value: null, status: 'incorrect' };
                            setBoard(cloneBoard(currentBoard));
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }, [cloneBoard, delay, speed, setBoard]); // Add setBoard to the dependency array

    const startSolving = useCallback(async () => {
        if (isSolving) return; // Prevent multiple solving processes
        setIsSolving(true);
        try {
            await solveBoard(board);
        } catch (error) {
            console.error('Error solving board:', error);
        } finally {
            setIsSolving(false);
        }
    }, [board, isSolving, solveBoard]);

    return {
        board,
        isSolving,
        startSolving,
        generatePuzzle,
    };
}