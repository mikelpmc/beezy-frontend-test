import React from 'react';

import './GenresList.css';

import GenreItem from './../GenreItem';

const GenresList = ({ genres, onRemoveGenre }) => {
    return genres && genres.length ? (
        genres.map(genre => (
            <GenreItem
                key={genre.id}
                genre={genre}
                onRemoveGenre={onRemoveGenre}
            />
        ))
    ) : (
        <p>No genres found</p>
    );
};

export default GenresList;
