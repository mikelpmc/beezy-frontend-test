import React from 'react';

import { BooksList, Searchbar, Filters, AlertMessage } from '../components';
import { Link } from 'react-router-dom';

const BooksListPage = ({
    bookStore,
    genreStore,
    alertStore,
    filters,
    onChangeGenreFilter,
    onChangePriceRange,
    onChangeSearch,
    onChangeOrderBy,
    onRemoveBook
}) => {
    const { type, message } = alertStore;

    return (
        <section className="section">
            <div className="container">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="is-active">
                            <Link to="/books">Books</Link>
                        </li>
                    </ul>
                </nav>

                <div className="columns is-centered is-multiline">
                    <div className="column is-one-third">
                        <Filters
                            genreStore={genreStore}
                            filters={filters}
                            onChangeGenreFilter={onChangeGenreFilter}
                            onChangePriceRange={onChangePriceRange}
                        />
                    </div>

                    <div className="column">
                        <AlertMessage type={type} message={message} />

                        <Searchbar
                            onChangeSearch={onChangeSearch}
                            onChangeOrderBy={onChangeOrderBy}
                            filters={filters}
                        />

                        <BooksList
                            bookStore={bookStore}
                            filters={filters}
                            onRemoveBook={onRemoveBook}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BooksListPage;
