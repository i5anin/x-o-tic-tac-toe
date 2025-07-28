import React from 'react';
import Information from '../Information/Information';
import Field from '../Field/Field';
import { store } from '../redux/store.js';
import { useReduxState } from '../useReduxState.js';

import styles from './Game.module.css';

const Game = () => {
	const { currentPlayer, field, isGameEnded, isDraw } = useReduxState();

	const handleCellClick = (index) => {
		store.dispatch({ type: 'CELL_CLICK', payload: { index } });
	};

	const handleReset = () => {
		store.dispatch({ type: 'RESET' });
	};

	return (
		<div className={styles.game}>
			<Information
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
			/>
			<Field field={field} onCellClick={handleCellClick} />
			<button className={styles.reset} onClick={handleReset}>
				Начать заново
			</button>
		</div>
	);
};

export default Game;
