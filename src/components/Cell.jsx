import React from 'react';

const Cell = ({ value, status }) => {
    return (
        <div
            className={`cell ${status}`} // Add class based on status
            data-status={status}
        >
            {value !== null ? value : ''}
        </div>
    );
};

export default Cell;
