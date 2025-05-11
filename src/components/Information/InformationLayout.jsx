import React from 'react';
import PropTypes from 'prop-types';
import styles from './Information.module.css';

const InformationLayout = ({ status }) => {
	const playerChar = status.at(-1); // Последний символ: X или 0
	const isPlayer = status.startsWith('Ходит') || status.startsWith('Победа');

	return (
		<div className={styles.information}>
			{isPlayer ? (
				<>
					{status.slice(0, -2)}
					<span className={playerChar === 'X' ? styles.x : styles.o}>
						{playerChar}
					</span>
				</>
			) : (
				status
			)}
		</div>
	);
};

InformationLayout.propTypes = {
	status: PropTypes.string.isRequired,
};

export default InformationLayout;
