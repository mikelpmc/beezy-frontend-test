import { GenresTypes } from './../constants';

import { AlertActions } from './alertsActions';
import { retrieveBooks } from './booksActions';

import store from './../store';

import { logic } from 'logic';
const Logic = logic();

export const retrieveGenres = ({ isDeleted = false } = {}) => {
    const genres = Logic.retrieveGenres({ isDeleted });

    return {
        type: GenresTypes.UPDATE_GENRES,
        payload: genres
    };
};

export const retrieveGenreById = ({ genreId }) => {
    genreId = Number(genreId);

    const genre = Logic.retrieveGenreById({ genreId });

    return {
        type: GenresTypes.RETRIEVE_GENRE,
        payload: genre
    };
};

export const addGenre = ({ name }) => {
    let error;
    try {
        Logic.addGenre({ name });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    return AlertActions.success(`Genre ${name} added correctly`);
};

export const updateGenre = ({ genreId, name }) => {
    genreId = Number(genreId);

    let error;
    try {
        Logic.updateGenre({ genreId, name });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    return AlertActions.success(`Genre ${name} updated correctly`);
};

export const removeGenre = ({ genreId }) => {
    genreId = Number(genreId);

    let error;
    try {
        Logic.removeGenre({ genreId });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    return [retrieveGenres(), retrieveBooks({})];
};
