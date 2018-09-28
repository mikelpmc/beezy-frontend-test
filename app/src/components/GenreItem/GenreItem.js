import React from 'react';
import { Link } from 'react-router-dom';

const GenreItem = ({ genre, onRemoveGenre }) => {
    return (
        <div className="genresList__item">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{genre.name}</p>
                </header>

                <footer className="card-footer">
                    <Link
                        to={`/genres/edit/${genre.id}`}
                        className="card-footer-item"
                    >
                        Edit
                    </Link>

                    <a
                        onClick={e => {
                            e.preventDefault();
                            onRemoveGenre(genre.id);
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

export default GenreItem;
