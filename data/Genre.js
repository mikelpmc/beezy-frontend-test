'use strict';

const {
    LogicError,
    validators: { _validateNumber, _validateString }
} = require('utils');

class Genre {
    constructor(id, name, deleted = false) {
        this._setId(id);
        this._setName(name);
        this._setDeleted(deleted);
    }

    _setId(id) {
        if (!_validateNumber(id)) throw new LogicError('invalid id');

        this.id = id;
    }

    _setName(name) {
        if (!_validateString(name)) throw new LogicError('invalid name');

        this.name = name;
    }

    _setDeleted(deleted) {
        this.deleted = deleted;
    }
}

module.exports = Genre;
