import { BookTypes } from './../constants';

import { AlertActions } from './alertsActions';

import { logic } from 'logic';
const Logic = logic();

export const retrieveBooks = ({
    title = '',
    genreId = '',
    prices = [],
    orderBy = '%2Bid',
    cursor = 0,
    limit = 2
}) => {
    if (genreId !== '' && genreId !== 'all') {
        genreId = Number(genreId);
    } else {
        genreId = '';
    }

    if (!Array.isArray(prices)) {
        prices = prices.split(',').map(price => Number(price));
    }

    const books = Logic.retrieveBooks({
        title,
        genreId,
        prices,
        orderBy,
        cursor: Number(cursor),
        limit: Number(limit)
    });

    return {
        type: BookTypes.UPDATE_BOOKS,
        payload: books
    };
};

export const retrieveBookById = ({ bookId }) => {
    bookId = Number(bookId);

    const book = Logic.retrieveBookById({ bookId });

    return {
        type: BookTypes.RETRIEVE_BOOK,
        payload: book
    };
};

export const addBook = ({ title, price, genreId }) => {
    price = Number(price);
    if (genreId !== '') genreId = Number(genreId);

    let error;
    try {
        Logic.addBook({ title, price, genreId });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    return AlertActions.success(`Book ${title} added correctly`);
};

export const updateBook = ({ bookId, title, price, genreId }) => {
    price = Number(price);
    genreId = Number(genreId);
    bookId = Number(bookId);

    let error;
    try {
        Logic.updateBook({ bookId, title, price, genreId });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    return AlertActions.success(`Book ${title} updated correctly`);
};

export const removeBook = ({ bookId, filters }) => {
    bookId = Number(bookId);

    let error;
    try {
        Logic.removeBook({ bookId });
    } catch ({ message }) {
        error = message;
    }

    if (error) {
        return AlertActions.error(error);
    }

    const { cursor, genre, prices, title, orderBy } = filters;
    return retrieveBooks({ cursor, genreId: genre, prices, title, orderBy });
};
