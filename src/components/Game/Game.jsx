import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Information from '../Information/Information.jsx';
import Field from '../Field/Field.jsx';

const GameLayout = () => {
	const { currentPlayer, field, isGameEnded, isDraw } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleCellClick = (index) => {
		dispatch({ type: 'CELL_CLICK', payload: { index } });
	};

	const handleReset = () => {
		dispatch({ type: 'RESET' });
	};

	return (
		<div>
			<Information
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
			/>
			<Field field={field} onCellClick={handleCellClick} />
			<button onClick={handleReset}>Начать заново</button>
		</div>
	);
};

export default GameLayout;
