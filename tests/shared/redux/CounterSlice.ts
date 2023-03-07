import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const CounterSlice = createSlice({
  name: 'Counter',
  initialState,
  reducers: {
    increment(state) {
      return { count: state.count + 1 };
    },
    decrement(state) {
      return { count: state.count - 1 };
    },
  },
});

const { reducer, actions } = CounterSlice;

export default reducer;
export const { increment, decrement } = actions;
export type CounterStateType = typeof initialState;
