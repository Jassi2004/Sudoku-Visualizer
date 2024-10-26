import isValidPlacement from './isValidPlacement';

const generateFullBoard = (initialBoard, highlightCell = () => { }) => {
    const board = initialBoard.map(row => row.map(cell => ({ ...cell })));

    const fillBoard = (boardToFill) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (boardToFill[row][col].value === null) {
                    const nums = [...Array(9).keys()]
                        .map(n => n + 1)
                        .sort(() => Math.random() - 0.5);

                    for (const num of nums) {
                        if (isValidPlacement(boardToFill, row, col, num, highlightCell)) {
                            boardToFill[row][col] = { value: num, status: 'normal' };
                            if (fillBoard(boardToFill)) return true;
                            boardToFill[row][col] = { value: null, status: 'normal' };
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    fillBoard(board);
    return board;
};

export default generateFullBoard;
