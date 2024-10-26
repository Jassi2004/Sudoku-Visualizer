import React from 'react';
import Cell from './Cell';

const Board = ({ board }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} value={cell.value} status={cell.status} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
