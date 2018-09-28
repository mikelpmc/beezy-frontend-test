import React from 'react';

import Nouislider from 'nouislider-react';

import 'nouislider/distribute/nouislider.css';
import './Filters.css';

const Filters = ({
    genreStore,
    filters,
    onChangeGenreFilter,
    onChangePriceRange
}) => {
    const changePriceRange = value => {
        onChangePriceRange(value);
    };

    const changeGenreFilter = e => {
        const value = e.target.value;

        onChangeGenreFilter(value);
    };

    // Only for visual purposes!
    const updatePriceLabel = values => {
        if (!isNaN(values[0])) {
            document.getElementById('min-value').innerHTML = values[0];
            document.getElementById('max-value').innerHTML = values[1];
        }
    };

    const renderSelectGenres = () => {
        const { genres } = genreStore;

        return (
            <div className="select is-rounded">
                <select
                    className="select__input"
                    value={filters.genre}
                    onChange={changeGenreFilter}
                >
                    <option value="all">All Genres</option>
                    {genres &&
                        genres.length &&
                        genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                </select>
            </div>
        );
    };

    return (
        <div className="panel">
            <p className="panel-heading">Filters</p>

            <div className="panel-block">
                <div className="panel-block__container">
                    <div className="field">
                        <label className="label panel-block__label">
                            Select a Genre
                        </label>

                        {renderSelectGenres()}
                    </div>

                    <div className="field">
                        <label className="label panel-block__label">
                            Select a Price range
                        </label>

                        <p className="price__label">
                            <span id="min-value">{filters.prices[0]}</span> -{' '}
                            <span id="max-value">{filters.prices[1]}</span>
                        </p>

                        <Nouislider
                            range={{ min: 0, max: 200 }}
                            start={filters.prices ? filters.prices : [0, 20]}
                            connect
                            onChange={changePriceRange}
                            onUpdate={updatePriceLabel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
