const initialState = {
	currentPlayer: 'X',
	field: Array(9).fill(''),
	isGameEnded: false,
	isDraw: false,
};

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CELL_CLICK': {
			const { index } = action.payload;
			if (state.field[index] || state.isGameEnded) return state;

			const newField = [...state.field];
			newField[index] = state.currentPlayer;

			const hasWinner = WIN_PATTERNS.some(
				([a, b, c]) =>
					newField[a] === state.currentPlayer &&
					newField[b] === state.currentPlayer &&
					newField[c] === state.currentPlayer,
			);

			const isDraw = !hasWinner && newField.every(cell => cell);

			return {
				...state,
				field: newField,
				isGameEnded: hasWinner,
				isDraw,
				currentPlayer: hasWinner || isDraw
					? state.currentPlayer
					: state.currentPlayer === 'X' ? '0' : 'X',
			};
		}
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};
