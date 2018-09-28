import multi from 'redux-multi';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/';

const store = createStore(reducers, {}, applyMiddleware(multi));

export default store;
