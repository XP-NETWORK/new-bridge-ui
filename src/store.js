// External Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Internal imports
import {selectReducer} from './reducers';

const reducers = {
    selectReducer,

};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
    rootReducer,
    applyMiddleware(thunk)
);