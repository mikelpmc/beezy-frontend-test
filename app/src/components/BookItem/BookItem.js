import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book, onRemoveBook }) => {
    return (
        <div className="booksList__item">
            <div className="card">
                <header className="card-header bookList__item__header">
                    <p className="card-header-title">{book.title}</p>
                </header>

                <div className="card-content">
                    <div className="content">
                        <div>
                            <strong>Genre:</strong> {book.genre.name}
                        </div>

                        <div>
                            <strong>Price:</strong> {book.price}$
                        </div>
                    </div>
                </div>

                <footer className="card-footer">
                    <Link
                        to={`/books/edit/${book.id}`}
                        className="card-footer-item"
                    >
                        Edit
                    </Link>

                    <a
                        onClick={e => {
                            e.preventDefault();
                            onRemoveBook(book.id);
                        }}
                        className="card-footer-item"
                    >
                        Delete
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default BookItem;
