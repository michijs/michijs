import { CaseReducer, createSlice, createStore, PayloadAction } from '@reduxjs/toolkit';

const setStateReducer: CaseReducer<any, PayloadAction<any>> = (state, action) => {
  if (typeof action.payload === 'object') {
    const newState = state;
    Object.keys(action.payload).forEach(key => {
      newState[key] = action.payload[key];
    });
    return newState;
  }
  return action.payload;
};

export function useStore<T>(initialState: T): [() => T, (payload: T) => void] {
  const AttributesSlice = createSlice({
    name: 'AttributesSlice',
    initialState,
    reducers: {
      setStateAction: setStateReducer
    }
  });

  const { reducer, actions } = AttributesSlice;

  const { setStateAction } = actions;

  const store = createStore(reducer);

  const setState = (payload: T) => {
    store.dispatch(setStateAction(payload));
  };

  return [store.getState, setState];
}