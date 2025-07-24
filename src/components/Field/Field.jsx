import { useReduxState } from '../../useReduxState';

import FieldLayout from './FieldLayout';

const Field = ({ onCellClick }) => {
	const { field } = useReduxState();

	return <FieldLayout field={field} onCellClick={onCellClick} />;
};

export default Field;
