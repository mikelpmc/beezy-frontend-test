'use strict';

const {
    LogicError,
    validators: { _validateNumber, _validateString }
} = require('utils');

const {
    Genre,
    Book,
    initialData: { genres, books }
} = require('data');

const _genres = [...genres];
const _books = [...books];

const logic = () => {
    /**
     * Retrieve all genres
     *
     * @returns {Array<Genre>}
     */
    const retrieveGenres = ({ isDeleted = false } = {}) => {
        return _genres.filter(({ deleted }) => deleted === isDeleted);
    };

    /**
     * Retrieve genre by id
     *
     * @param {number} id - genre id
     *
     * @returns {Object<Genre>}
     */
    const retrieveGenreById = ({ genreId }) => {
        const genre = _genres.find(
            ({ id, deleted }) => id === genreId && !deleted
        );

        return genre;
    };

    /**
     * Add new genre
     *
     * @param {string} nae
     *
     * @returns {Boolean} - true if genre was added correctly
     * @throws {Error} - if there was an error adding the genre
     */
    const addGenre = ({ name } = {}) => {
        if (!_validateString(name)) throw new LogicError(`invalid name`);

        if (_alreadyExists(_genres, 'name', name))
            throw new LogicError(`genre ${name} already exists`);

        const nextGenreId = _generateNextId(_genres);
        const newGenre = new Genre(nextGenreId, name);

        _genres.push(newGenre);

        return true;
    };

    /**
     * Update a genre by its genre id
     *
     * @param {number} genreId
     * @param {string} name
     *
     * @returns {Boolean} - true if the genre was updated correctly
     * @throws {Error} - If an error ocurred updating the genre
     */
    const updateGenre = ({ genreId, name } = {}) => {
        if (!_validateNumber(genreId)) throw new LogicError(`invalid genre id`);

        if (!_validateString(name)) throw new LogicError(`invalid name`);

        if (!_isValidGenreId(genreId)) throw new LogicError(`invalid genre`);

        if (
            !!_genres.find(
                ({ name: _name, id, deleted }) =>
                    _name.toLowerCase() === name.toLowerCase() &&
                    id !== genreId &&
                    !deleted
            )
        )
            throw new LogicError(`genre with name ${name} already exists`);

        const genre = _genres.find(({ id }) => id === genreId);

        genre.name = name;

        return true;
    };

    /**
     * Remove a genre
     *
     * @param {number} genreId
     *
     * @returns {Boolean} - true if the genre was removed correctly
     * @throws {Error} - if an error ocurred removing the genre
     */
    const removeGenre = ({ genreId } = {}) => {
        if (!_validateNumber(genreId)) throw new LogicError(`invalid genre id`);

        if (!_isValidGenreId(genreId)) throw new LogicError(`invalid genre`);

        const genre = _genres.find(({ id }) => id === genreId);

        genre.deleted = true;

        // set deleted to true on every book with this genre also
        _books.forEach(book => {
            let result = false;

            if (typeof book.genre !== 'object') {
                if (book.genre === genreId) result = true;
            } else {
                if (book.genre.id === genreId) result = true;
            }

            if (result) {
                book.deleted = true;
            }
        });

        return true;
    };

    /**
     * Retrieve books
     *
     * @param {string} title - Title to search the books with
     * @param {number} genreId -  Genre of the book to filter with
     * @param {Array<number>} prices - Range of prices [min, max]
     * @param {string} orderBy - String to order by -[field]: desc / +[field]: asc
     * @param {number} cursor - Next position of the array to retrieve from
     * @param {number} limit - Limit the number of returned results
     *
     * @returns {Object} - An object with the books and the cursor of the next position of the array to retrieve from
     */
    const retrieveBooks = ({
        title = '',
        genreId = '',
        prices = [],
        orderBy = '+id',
        cursor = 0,
        limit = 2
    } = {}) => {
        let books = [..._books];

        // Filter
        books = _filterBooks(books, title, genreId, prices);

        const totalResults = books.length;

        // Sort
        const order = orderBy.substring(1, orderBy.length);
        const sort = orderBy[0];

        if (order.length && sort.length) {
            books = _sortBooks(books, sort, order);
        }

        const nextCursor = _calculateCursor(books, limit, cursor);

        books = books.slice(cursor, limit + cursor);

        // Populate genre
        if (books && books.length) {
            books.forEach(book => {
                if (typeof book.genre !== 'object') {
                    const genre = _genres.find(({ id }) => id === book.genre);

                    book.genre = genre;
                }
            });
        }

        return {
            cursor: nextCursor,
            total: totalResults,
            books
        };
    };

    /**
     * Retrieve book by its id
     *
     * @param {bookId} bookId
     *
     * @returns {Object<Book>}
     */
    const retrieveBookById = ({ bookId } = {}) => {
        const book = _books.find(
            ({ id, deleted }) => id === bookId && !deleted
        );

        if (!book) return {};

        // Populate genre
        if (typeof book.genre !== 'object') {
            const genre = _genres.find(({ id }) => id === book.genre);

            book.genre = genre;
        }

        return book;
    };

    /**
     *
     * Add a book
     *
     * @param {string} title
     * @param {number} price
     * @param {number} genreId
     *
     * @returns {Boolean} - true when a book is added correctly
     * @throws {Error} - when an error occurs on adding a book
     */
    const addBook = ({ title, price, genreId } = {}) => {
        if (!_validateString(title)) throw new LogicError('invalid title');

        if (!_validateNumber(price)) throw new LogicError('invalid price');

        if (price < 1) throw new LogicError('the mininum price is 1');

        if (_alreadyExists(_books, 'title', title))
            throw new LogicError(`book ${title} already exists`);

        if (!_isValidGenreId(genreId)) throw new LogicError('invalid genre');

        const nextBookId = _generateNextId(_books);

        const newBook = new Book(nextBookId, title, price, genreId);

        _books.push(newBook);

        return true;
    };

    /**
     * Update a book by its id
     *
     * @param {number} bookId
     * @param {string} title
     * @param {number} price
     * @param {number} genreId
     *
     * @returns {Boolean} - true when a book is updated correctly
     * @throws {Error} - when an error occurs on updating a book
     */
    const updateBook = ({ bookId, title, price, genreId } = {}) => {
        if (!_validateString(title)) throw new LogicError('invalid title');

        if (!_validateNumber(price)) throw new LogicError('invalid price');

        if (price < 1) throw new LogicError('the mininum price is 1');

        if (!_isValidBookId(bookId))
            throw new LogicError(`book ${bookId} does not exists`);

        if (!_isValidGenreId(genreId)) throw new LogicError(`invalid genre`);

        if (
            !!_books.find(
                ({ title: oldtitle, id, deleted }) =>
                    oldtitle.toLowerCase() === title.toLowerCase() &&
                    id !== bookId &&
                    !deleted
            )
        )
            throw new LogicError(`book with title ${title} already exists`);

        const book = _books.find(({ id }) => id === bookId);

        book.title = title;
        book.price = price;
        book.genre = genreId;

        return true;
    };

    /**
     * Remove a book
     *
     * @param {number} bookId
     *
     * @returns {Boolean} - true if book is removed
     * @throws {Error} - if the provided bookId is not valid
     */
    const removeBook = ({ bookId } = {}) => {
        if (!_isValidBookId(bookId))
            throw new LogicError(`book ${bookId} does not exists`);

        const book = _books.find(({ id }) => id === bookId);

        book.deleted = true;

        return true;
    };

    /**
     * Filters the given books with the given parameters
     *
     * @param {Array<Book>} books
     * @param {string} title
     * @param {string} genre
     * @param {Array<number>} prices
     *
     * @returns {Array<Book>}
     */
    const _filterBooks = (books, title, genreId, prices) => {
        return books.filter(book => {
            let result = true;

            if (book.deleted) return false;

            if (title && title.length) {
                const regex = new RegExp(title, 'gi');

                if (book.title.search(regex) === -1) result = false;
            }

            if (genreId !== '') {
                if (typeof book.genre === 'object') {
                    if (book.genre.id !== genreId) {
                        result = false;
                    }
                } else {
                    if (book.genre !== genreId) {
                        result = false;
                    }
                }
            }

            if (
                prices &&
                prices.length === 2 &&
                prices.every(_validateNumber)
            ) {
                const [min, max] = prices;

                if (book.price < min || book.price > max) result = false;
            }

            return result;
        });
    };

    /**
     * Sorts the given array of books withe the given criteria
     *
     * @param {Array<Book>} books
     * @param {string} sort
     * @param {string} order
     *
     * @returns {Array<Book>}
     */
    const _sortBooks = (books, sort, order) => {
        return books.sort((a, b) => {
            if (sort === '-') {
                if (a[order] > b[order]) return -1;
                else if (a[order] < b[order]) return 1;

                return 0;
            } else {
                if (a[order] > b[order]) return 1;
                else if (a[order] < b[order]) return -1;

                return 0;
            }
        });
    };

    /**
     * Checks if a given value already exists on the given collection
     *
     * @param {Array<Books>|Array<Genres>} collection
     * @param {string} field
     * @param {string} value
     *
     * @returns {Boolean} true of false indication if the value exists or not
     */
    const _alreadyExists = (collection, field, value) => {
        if (collection.length) {
            return !!collection.find(
                el =>
                    el[field].toLowerCase() === value.toLowerCase() &&
                    !el.deleted
            );
        }

        return false;
    };

    /**
     * Validates genre id
     *
     * @param {string} genre
     *
     * @returns {Boolean} - true if genre exists false if not
     */
    const _isValidGenreId = genreId =>
        !!_genres.find(({ id }) => id === genreId);

    /**
     * Validates book id
     *
     * @param {number} bookId
     *
     * @returns {Boolean} - true if id exists false if not
     */
    const _isValidBookId = bookId => !!_books.find(({ id }) => id === bookId);

    /**
     * Generates the next id of the given collection
     *
     * @param {Array} collection - Array of books or genres
     *
     * @returns {number} - Id for the next item in collection to insert
     */
    const _generateNextId = collection => {
        return collection.length ? collection[collection.length - 1].id + 1 : 0;
    };

    /**
     * Calculate the cursor for the next id to retrieve from
     *
     * @param {books} books
     * @param {limit} limit
     * @param {cursor} cursor
     *
     * @returns {id|null} - Id of the next book or null if there isnt more books to retrieve
     */
    const _calculateCursor = (books, limit, cursor) => {
        return books.length > limit + cursor ? limit + cursor : null;
    };

    return Object.freeze({
        retrieveGenres,
        retrieveGenreById,
        addGenre,
        updateGenre,
        removeGenre,
        retrieveBooks,
        retrieveBookById,
        addBook,
        updateBook,
        removeBook
    });
};

module.exports = { logic, data: { _genres, _books } };
