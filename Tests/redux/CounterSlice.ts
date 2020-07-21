import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	count: 1
};

const CounterSlice = createSlice({
	name: 'Counter',
	initialState: initialState,
	reducers: {
		increment(state) {
			return { count: state.count + 1 };
		},
	}
});

const { reducer, actions } = CounterSlice;

export default reducer;
export const { increment } = actions;
export type CounterStateType = typeof initialState;