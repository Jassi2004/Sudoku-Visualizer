// Remove numbers to create a puzzle
const createPuzzle = (board, difficulty) => {
    const removeCells = (board, cellsToRemove) => {
        let count = 0;
        while (count < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (board[row][col].value !== null) {
                board[row][col] = { value: null, status: 'normal' };
                count++;
            }
        }
        return board;
    };

    const cellsToRemove = difficulty === 'easy' ? 36 : difficulty === 'medium' ? 45 : 54;
    return removeCells(board, cellsToRemove);
};

export default createPuzzle;
