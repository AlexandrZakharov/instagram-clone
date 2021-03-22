import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import auth from "./reducers/user";

const reducers = combineReducers({ auth });

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;