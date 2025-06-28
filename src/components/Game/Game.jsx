import React, { useEffect, useState } from 'react';

import { store } from '../redux/store';
import Information from '../Information/Information.jsx';
import Field from '../Field/Field.jsx';

const GameLayout = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});
		return unsubscribe;
	}, []);

	const handleCellClick = (index) => {
		store.dispatch({ type: 'CELL_CLICK', payload: { index } });
	};

	const handleReset = () => {
		store.dispatch({ type: 'RESET' });
	};

	return (
		<div>
			<Information
				currentPlayer={state.currentPlayer}
				isGameEnded={state.isGameEnded}
				isDraw={state.isDraw}
			/>
			<Field field={state.field} onCellClick={handleCellClick} />
			<button onClick={handleReset}>Начать заново</button>
		</div>
	);
};

export default GameLayout;
