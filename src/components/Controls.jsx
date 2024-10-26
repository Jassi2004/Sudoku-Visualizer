const Controls = ({ generatePuzzle, startSolving, setSpeed }) => {
    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value));
    };

    return (
        <div className="controls">
            <button onClick={() => generatePuzzle('easy')}>Generate Easy Puzzle</button>
            <button onClick={() => generatePuzzle('medium')}>Generate Medium Puzzle</button>
            <button onClick={() => generatePuzzle('hard')}>Generate Hard Puzzle</button>
            <button onClick={startSolving}>Solve</button>
            <input
                type="range"
                min="1"
                max="100"
                defaultValue={1}
                onChange={handleSpeedChange}
            />
            <label>Speed</label>
        </div>
    );
};

export default Controls;

