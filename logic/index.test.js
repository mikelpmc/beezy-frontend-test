'use strict';

const { expect } = require('chai');
const { Genre, Book } = require('data');

const {
    logic,
    data: { _genres, _books }
} = require('.');

const Logic = logic();

_genres.length = 0;
_books.length = 0;

describe('Logic', () => {
    afterEach(() => {
        _genres.length = 0;
        _books.length = 0;
    });

    describe('Genres', () => {
        describe('retrieve genres', () => {
            beforeEach(() => {
                _genres.push(
                    new Genre(0, 'Development'),
                    new Genre(1, 'Fantasy'),
                    new Genre(2, 'Sci-fi', true)
                );
            });
            it('should retrieve genres correctly (non deleted)', () => {
                const genres = Logic.retrieveGenres();

                expect(genres).to.exist;
                expect(genres.length).to.equal(2);
            });

            it('should retrieve genres correctly (deleted)', () => {
                const genres = Logic.retrieveGenres({
                    isDeleted: true
                });

                expect(genres).to.exist;
                expect(genres.length).to.equal(1);
            });
        });

        describe('Retrieve genre by id', () => {
            beforeEach(() => {
                _genres.push(
                    new Genre(0, 'Development'),
                    new Genre(1, 'Fantasy'),
                    new Genre(2, 'Sci-fi', true)
                );
            });

            it('should retrieve genre correctly', () => {
                const genre = Logic.retrieveGenreById({ genreId: 0 });

                expect(genre).to.exist;
                expect(genre.id).to.equal(0);
                expect(genre.name).to.equal('Development');
                expect(genre.deleted).to.be.false;
            });
        });

        describe('Add genre', () => {
            it('should add a genre correctly', () => {
                expect(_genres.length).to.equal(0);

                Logic.addGenre({ name: 'Development' });

                expect(_genres.length).to.equal(1);

                const { name } = _genres[0];
                expect(name).to.equals('Development');
            });

            it('should fail on undefined name', () => {
                expect(() => {
                    Logic.addGenre({});
                }).to.throw('invalid name');
            });

            it('should fail on not string name', () => {
                expect(() => {
                    Logic.addGenre({ name: null });
                }).to.throw('invalid name');

                expect(() => {
                    Logic.addGenre({ name: false });
                }).to.throw('invalid name');

                expect(() => {
                    Logic.addGenre({ name: 123 });
                }).to.throw('invalid name');
            });

            it('should fail on adding an already existing genre', () => {
                _genres.push(new Genre(0, 'Development'));

                expect(() => Logic.addGenre({ name: 'development' })).to.throw(
                    'genre development already exists'
                );
            });
        });

        describe('Update genre', () => {
            beforeEach(() => {
                _genres.push(new Genre(0, 'Development'));
            });

            it('should update a genre correctly', () => {
                const genre = _genres[0];

                expect(genre.name).to.equal('Development');
                expect(_genres.length).to.equal(1);

                Logic.updateGenre({ genreId: 0, name: 'Fantasy' });

                expect(genre.name).to.equal('Fantasy');
                expect(_genres.length).to.equal(1);
            });

            it('should fail on invalid genre id', () => {
                expect(() => Logic.updateGenre({})).to.throw(
                    'invalid genre id'
                );

                expect(() => Logic.updateGenre({ genreId: null })).to.throw(
                    'invalid genre id'
                );

                expect(() => Logic.updateGenre({ genreId: false })).to.throw(
                    'invalid genre id'
                );

                expect(() => Logic.updateGenre({ genreId: 'awsd' })).to.throw(
                    'invalid genre id'
                );
            });

            it('should fail on invalid name provided', () => {
                expect(() => Logic.updateGenre({ genreId: 0 })).to.throw(
                    'invalid name'
                );

                expect(() =>
                    Logic.updateGenre({ genreId: 0, name: null })
                ).to.throw('invalid name');

                expect(() =>
                    Logic.updateGenre({ genreId: 0, name: false })
                ).to.throw('invalid name');

                expect(() =>
                    Logic.updateGenre({ genreId: 0, name: 123 })
                ).to.throw('invalid name');
            });

            it('should fail on non existing genre id', () => {
                expect(() =>
                    Logic.updateGenre({ genreId: 123, name: 'fsdfsd' })
                ).to.throw('invalid genre');
            });

            it('should fail on already existing genre name', () => {
                _genres.push(
                    new Genre(0, 'Development'),
                    new Genre(1, 'Fantasy')
                );

                expect(() =>
                    Logic.updateGenre({
                        genreId: 1,
                        name: 'development'
                    })
                ).to.throw('genre with name development already exists');
            });
        });

        describe('Remove genre', () => {
            beforeEach(() => {
                _genres.push(new Genre(0, 'Development'));
            });

            it('should remove genre correctly', () => {
                const genre = _genres[0];

                expect(genre.deleted).to.be.false;

                Logic.removeGenre({ genreId: 0 });

                expect(genre.deleted).to.be.true;
            });

            it('should remove genre correctly and all the books with same genreId', () => {
                _genres.push(new Genre(1, 'Fantasy'));

                _books.push(
                    new Book(0, 'Book 1', 100, 0),
                    new Book(1, 'Book 2', 200, 0),
                    new Book(2, 'Book 3', 200, 1)
                );

                expect(
                    _books.filter(({ genre }) => genre === 0).length
                ).to.equal(2);

                Logic.removeGenre({ genreId: 0 });

                expect(
                    _books.filter(
                        ({ genre, deleted }) => genre === 0 && deleted
                    ).length
                ).to.equal(2);
                expect(
                    _books.filter(
                        ({ genre, deleted }) => genre === 1 && !deleted
                    ).length
                ).to.equal(1);
            });

            it('should fail on no existing genreId', () => {
                expect(() => Logic.removeGenre({ genreId: 1 })).to.throw(
                    'invalid genre'
                );
            });

            it('should fail on invalid genre id', () => {
                expect(() => Logic.removeGenre({})).to.throw(
                    'invalid genre id'
                );
            });
        });
    });

    describe('Books', () => {
        beforeEach(() => {
            _genres.push(new Genre(0, 'Development'), new Genre(1, 'Fantasy'));

            _books.push(
                new Book(0, 'Javascript and nodejs', 100, 0),
                new Book(1, 'Nodejs, the good parts', 20.5, 0),
                new Book(2, 'The lord of the rings', 500, 1),
                new Book(3, 'The invisible book', 123123, 1, true)
            );
        });

        describe('Retrieve books', () => {
            it('Default filters (limit 2)', () => {
                const { books, cursor } = Logic.retrieveBooks();

                expect(books.length).to.equal(2);
                expect(cursor).to.equal(2);

                expect(books[0].id).to.equal(0);
                expect(books[1].id).to.equal(1);
            });

            it('with limit 5', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    limit: 5
                });

                expect(books.length).to.equal(3);
                expect(cursor).to.be.null;

                expect(books[0].id).to.equal(0);
                expect(books[1].id).to.equal(1);
                expect(books[2].id).to.equal(2);
            });

            it('with order id desc', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    orderBy: '-id'
                });

                expect(books.length).to.equal(2);
                expect(cursor).to.equal(2);

                expect(books[0].id).to.equal(2);
                expect(books[1].id).to.equal(1);
            });

            it('with order by price desc', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    orderBy: '-price'
                });

                expect(books.length).to.equal(2);
                expect(cursor).to.equal(2);

                const [book1, book2] = books;

                expect(book1.id).to.equal(2);
                expect(book1.price).to.equal(500);
                expect(book1.title).to.equal('The lord of the rings');
                expect(book1.genre.id).to.equal(1);
                expect(book1.genre.name).to.equal('Fantasy');

                expect(book2.id).to.equal(0);
                expect(book2.price).to.equal(100);
                expect(book2.title).to.equal('Javascript and nodejs');
                expect(book2.genre.id).to.equal(0);
                expect(book2.genre.name).to.equal('Development');
            });

            it('with genre filter', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    genreId: 1
                });

                expect(books.length).to.equal(1);
                expect(cursor).to.not.exist;

                const [book] = books;

                expect(book.id).to.equal(2);
                expect(book.price).to.equal(500);
                expect(book.title).to.equal('The lord of the rings');
                expect(book.genre.id).to.equal(1);
                expect(book.genre.name).to.equal('Fantasy');
            });

            it('with title search', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    title: 'node'
                });

                expect(books.length).to.equal(2);
                expect(cursor).to.not.exist;

                const [book1, book2] = books;

                expect(book1.id).to.equal(0);
                expect(book1.price).to.equal(100);
                expect(book1.title).to.equal('Javascript and nodejs');
                expect(book1.genre.id).to.equal(0);
                expect(book1.genre.name).to.equal('Development');

                expect(book2.id).to.equal(1);
                expect(book2.price).to.equal(20.5);
                expect(book2.title).to.equal('Nodejs, the good parts');
                expect(book2.genre.id).to.equal(0);
                expect(book2.genre.name).to.equal('Development');
            });

            it('with price range ordered by price desc', () => {
                const { books, cursor } = Logic.retrieveBooks({
                    prices: [90, 505],
                    orderBy: '-price'
                });

                expect(books.length).to.equal(2);
                expect(cursor).to.not.exist;

                const [book1, book2] = books;

                expect(book1.id).to.equal(2);
                expect(book1.price).to.equal(500);
                expect(book1.title).to.equal('The lord of the rings');
                expect(book1.genre.id).to.equal(1);
                expect(book1.genre.name).to.equal('Fantasy');

                expect(book2.id).to.equal(0);
                expect(book2.price).to.equal(100);
                expect(book2.title).to.equal('Javascript and nodejs');
                expect(book2.genre.id).to.equal(0);
                expect(book2.genre.name).to.equal('Development');
            });

            it('should work cursor pagination feature correctly', () => {
                const { cursor: cursor1 } = Logic.retrieveBooks();
                expect(cursor1).to.equal(2);

                const { cursor: cursor2 } = Logic.retrieveBooks({
                    cursor: cursor1
                });

                expect(cursor2).to.equal(null);
            });
        });

        describe('Retrieve book by id', () => {
            it('should retrieve book correctly', () => {
                const book = Logic.retrieveBookById({ bookId: 0 });

                expect(book).to.exist;

                expect(book.id).to.equal(0);
                expect(book.title).to.equal('Javascript and nodejs');
                expect(book.price).to.equal(100);
                expect(book.genre.id).to.equal(0);
                expect(book.genre.name).to.equal('Development');
                expect(book.deleted).to.be.false;
            });

            it('should retrieve empty object on no book found', () => {
                const book = Logic.retrieveBookById({ bookId: 1321 });

                expect(book).to.exist;
                expect(book).to.be.empty;
            });

            it('should return empty object on no params provided', () => {
                const book = Logic.retrieveBookById();

                expect(book).to.exist;
                expect(book).to.be.empty;
            });
        });

        describe('Add book', () => {
            it('should add book correctly', () => {
                expect(_books.length).to.equal(4);

                Logic.addBook({
                    title: 'Juantxo la araña',
                    price: 999.99,
                    genreId: 1
                });

                expect(_books.length).to.equal(5);

                const book = _books[4];

                expect(book.title).to.equal('Juantxo la araña');
                expect(book.price).to.equal(999.99);
                expect(book.deleted).to.be.false;
                expect(book.genre).to.equal(1);
            });

            it('should fail on non existing genre id provided', () => {
                expect(_books.length).to.equal(4);

                expect(() =>
                    Logic.addBook({
                        title: 'Juantxo la araña',
                        price: 999.99,
                        genreId: 123
                    })
                ).to.throw('invalid genre');
            });

            it('should fail on already existing title', () => {
                expect(_books.length).to.equal(4);

                expect(() =>
                    Logic.addBook({
                        title: 'the lord of the RINGS',
                        price: 20
                    })
                ).to.throw('book the lord of the RINGS already exists');
            });

            it('should fail on invalid price provided', () => {
                expect(_books.length).to.equal(4);

                expect(() =>
                    Logic.addBook({
                        title: 'Teo goes to the zoo',
                        genreId: 0,
                        price: '123'
                    })
                ).to.throw('invalid price');
            });

            it('should fail on invalid title provided', () => {
                expect(_books.length).to.equal(4);

                expect(() =>
                    Logic.addBook({
                        title: 123
                    })
                ).to.throw('invalid title');
            });

            it('should fail on price below 1 provided', () => {
                expect(_books.length).to.equal(4);

                expect(() =>
                    Logic.addBook({
                        title: 'blabla',
                        genreId: 0,
                        price: 0
                    })
                ).to.throw('the mininum price is 1');
            });
        });

        describe('Upate book', () => {
            it('should update correctly', () => {
                let book = _books[0];

                expect(book.id).to.equal(0);
                expect(book.title).to.equal('Javascript and nodejs');
                expect(book.price).to.equal(100);
                expect(book.genre).to.equal(0);

                Logic.updateBook({
                    bookId: 0,
                    title: 'Javascript and Nodejs, the good parts',
                    price: 120,
                    genreId: 0
                });

                expect(book.id).to.equal(0);
                expect(book.title).to.equal(
                    'Javascript and Nodejs, the good parts'
                );
                expect(book.price).to.equal(120);
                expect(book.genre).to.equal(0);
            });

            it('should fail on non existing book id', () => {
                expect(() =>
                    Logic.updateBook({
                        title: 'blabla',
                        price: 20,
                        bookId: 123
                    })
                ).to.throw('book 123 does not exists');
            });

            it('should fail on non existing genre id', () => {
                expect(() =>
                    Logic.updateBook({
                        title: 'blabla',
                        price: 20,
                        bookId: 0,
                        genreId: 123
                    })
                ).to.throw('invalid genre');
            });

            it('should fail on already existing title on another book', () => {
                expect(() =>
                    Logic.updateBook({
                        bookId: 0,
                        genreId: 1,
                        price: 20,
                        title: 'The lord of the rings'
                    })
                ).to.throw(
                    'book with title The lord of the rings already exists'
                );
            });

            it('should fail on invalid title', () => {
                expect(() =>
                    Logic.updateBook({
                        title: 124
                    })
                ).to.throw('invalid title');
            });

            it('should fail on invalid price', () => {
                expect(() =>
                    Logic.updateBook({
                        title: 'blabla',
                        price: '123'
                    })
                ).to.throw('invalid price');
            });

            it('should fail on price below 1', () => {
                expect(() =>
                    Logic.updateBook({
                        title: 'blabla',
                        price: 0
                    })
                ).to.throw('the mininum price is 1');
            });
        });

        describe('Remove Book', () => {
            it('should remove book correctly', () => {
                let booksNotDeleted = _books.filter(({ deleted }) => !deleted);

                expect(booksNotDeleted.length).to.equal(3);

                Logic.removeBook({ bookId: 0 });

                booksNotDeleted = _books.filter(({ deleted }) => !deleted);

                expect(booksNotDeleted.length).to.equal(2);
                expect(_books.find(({ id }) => id === 0).deleted).to.be.true;
            });

            it('should fail on non existing book id provided', () => {
                expect(() => Logic.removeBook({ bookId: 123 })).to.throw(
                    'book 123 does not exists'
                );
            });

            it('should fail on no book id provided', () => {
                expect(() => Logic.removeBook()).to.throw(
                    'book undefined does not exists'
                );
            });
        });
    });
});
