import React from 'react';
import PropTypes from 'prop-types';

import Information from '../Information/Information';
import Field from '../Field/Field';

import styles from './Game.module.css';

const GameLayout = ({
	currentPlayer,
	field,
	isGameEnded,
	isDraw,
	onCellClick,
	onReset,
}) => (
	<div className={styles.game}>
		<Information		/>
		<Field field={field} onCellClick={onCellClick} />
		<button className={styles.reset} onClick={onReset}>
			Начать заново
		</button>
	</div>
);

GameLayout.propTypes = {
	currentPlayer: PropTypes.string.isRequired,
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	isDraw: PropTypes.bool.isRequired,
	onCellClick: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
};

export default GameLayout;
