import { useEffect, useState } from 'react';

import { store } from './components/redux/store.js';

/**
 * Кастомный хук для подписки на Redux store.
 * Возвращает актуальное состояние стора и вызывает ререндер при изменении.
 *
 * @returns {object} Текущее состояние Redux store
 */
export function useReduxState() {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		// Отписка при размонтировании компонента
		return unsubscribe;
	}, []);

	return state;
}
