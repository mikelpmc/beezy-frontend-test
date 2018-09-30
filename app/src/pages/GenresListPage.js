import React from 'react';
import { Link } from 'react-router-dom';

import { AlertMessage, GenresList } from '../components';

const GenresListPage = ({ genres, onRemoveGenre, alertStore }) => {
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
                            <Link to="/genres">Genres</Link>
                        </li>
                    </ul>
                </nav>

                <div className="button__container">
                    <Link
                        to="/genres/add"
                        className="button is-link is-rounded"
                    >
                        Add new Genre
                    </Link>
                </div>

                <div className="columns is-centered is-multiline">
                    <div className="column">
                        <AlertMessage type={type} message={message} />

                        <div className="genresList">
                            <GenresList
                                genres={genres}
                                onRemoveGenre={onRemoveGenre}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenresListPage;
