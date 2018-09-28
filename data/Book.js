'use strict';

const {
    LogicError,
    validators: { _validateNumber, _validateString }
} = require('utils');

class Book {
    constructor(id, title, price, genre, deleted = false) {
        this._setId(id);
        this._setTitle(title);
        this._setPrice(price);
        this._setGenre(genre);
        this._setDeleted(deleted);
    }

    _setId(id) {
        if (!_validateNumber(id)) throw new LogicError('invalid id');

        this.id = id;
    }

    _setTitle(title) {
        if (!_validateString(title)) throw new LogicError('invalid title');

        this.title = title;
    }

    _setPrice(price) {
        if (!_validateNumber(price)) throw new LogicError('invalid price');

        this.price = price;
    }

    _setGenre(genre) {
        if (!_validateNumber(genre)) throw new LogicError('invalid genre');

        this.genre = genre;
    }

    _setDeleted(deleted) {
        this.deleted = deleted;
    }
}

module.exports = Book;
