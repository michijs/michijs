import counterStore from "./CounterSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counterStore,
  },
  devTools: true,
});

export type StoreType = ReturnType<typeof store.getState>;
