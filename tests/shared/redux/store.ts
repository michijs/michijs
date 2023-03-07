import counterStore from './CounterSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counterStore,
  },
  devTools: true,
});

const state = store.getState();
export type StoreType = typeof state;
