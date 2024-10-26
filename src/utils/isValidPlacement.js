const isValidPlacement = (board, row, col, num) => {
    // Check the row
    for (let c = 0; c < 9; c++) {
        if (board[row][c].value === num) return false;
    }

    // Check the column
    for (let r = 0; r < 9; r++) {
        if (board[r][col].value === num) return false;
    }

    // Check the 3x3 box
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
        for (let c = boxColStart; c < boxColStart + 3; c++) {
            if (board[r][c].value === num) return false;
        }
    }

    return true;
};

export default isValidPlacement;
