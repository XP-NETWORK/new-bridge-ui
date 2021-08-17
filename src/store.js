// External Imports
import { createStore, combineReducers } from 'redux';
// Internal imports
import {selectReducer} from './reducers';

const reducers = {
    selectReducer,

};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
    rootReducer,

);