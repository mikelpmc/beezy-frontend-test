import { combineReducers } from 'redux';

import booksReducer from './booksReducer';
import genresReducer from './genresReducer';
import alertsReducer from './alertsReducer';

export default combineReducers({
    bookStore: booksReducer,
    genreStore: genresReducer,
    alertStore: alertsReducer
});
