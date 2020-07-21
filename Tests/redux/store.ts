import { createStore, applyMiddleware, combineReducers } from 'redux';
import counterStore from './CounterSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducersCombined = combineReducers({ counterStore });
export const store = createStore(reducersCombined, applyMiddleware(thunk, logger));
const state = store.getState();
export type StoreType = typeof state;