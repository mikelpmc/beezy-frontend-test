import React from 'react';

import './BooksList.css';

import { BookItem, Pagination } from '..';

const BooksList = ({ bookStore, filters, onRemoveBook }) => {
    const renderBooks = () => {
        const { books, total } = bookStore;

        if (books && books.length) {
            return (
                <React.Fragment>
                    <div className="booksList">
                        {books.map(book => {
                            return (
                                <BookItem
                                    key={book.id}
                                    book={book}
                                    onRemoveBook={onRemoveBook}
                                />
                            );
                        })}
                    </div>

                    <Pagination
                        totalResults={total}
                        limit={2}
                        filters={filters}
                    />
                </React.Fragment>
            );
        }

        return <p>No books found</p>;
    };

    return renderBooks();
};

export default BooksList;
