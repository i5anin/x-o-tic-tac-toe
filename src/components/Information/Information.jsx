import { useReduxState } from '../../useReduxState';

import InformationLayout from './InformationLayout';

const Information = () => {
	const { currentPlayer, isGameEnded, isDraw } = useReduxState();

	let status;
	if (isDraw) {
		status = 'Ничья';
	} else if (isGameEnded) {
		status = `Победа: ${currentPlayer}`;
	} else {
		status = `Ходит: ${currentPlayer}`;
	}

	return <InformationLayout status={status} />;
};

export default Information;
