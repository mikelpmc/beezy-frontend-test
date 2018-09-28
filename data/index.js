const Genre = require('./Genre');
const Book = require('./Book');

const { genres, books } = require('./initialData');

module.exports = { Genre, Book, initialData: { genres, books } };
