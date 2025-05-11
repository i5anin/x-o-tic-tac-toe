import React, { useState } from 'react';
import GameLayout from './GameLayout';

const initialField = Array(9).fill('');

const WIN_PATTERNS = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];

const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [field, setField] = useState(initialField);
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);

	const handleCellClick = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		setField(newField);

		const hasWinner = WIN_PATTERNS.some(([a, b, c]) =>
			newField[a] === currentPlayer &&
			newField[b] === currentPlayer &&
			newField[c] === currentPlayer
		);

		if (hasWinner) {
			setIsGameEnded(true);
		} else if (newField.every((cell) => cell)) {
			setIsDraw(true);
		} else {
			setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
		}
	};

	const handleReset = () => {
		setCurrentPlayer('X');
		setField(initialField);
		setIsGameEnded(false);
		setIsDraw(false);
	};

	return (
		<GameLayout
			currentPlayer={currentPlayer}
			field={field}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			onCellClick={handleCellClick}
			onReset={handleReset}
		/>
	);
};

export default Game;
