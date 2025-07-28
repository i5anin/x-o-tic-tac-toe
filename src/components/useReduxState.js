import { useEffect, useState } from 'react';

import { store } from './redux/store.js';

/**
 * Хук подписки на Redux store без react-redux.
 * @returns {object} - Актуальное состояние хранилища
 */
export const useReduxState = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});
		return () => unsubscribe();
	}, []);

	return state;
};
