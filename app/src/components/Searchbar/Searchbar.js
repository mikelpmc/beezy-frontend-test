import React from 'react';

const Searchbar = ({ onChangeSearch, onChangeOrderBy, filters }) => {
    return (
        <div className="columns">
            <div className="column is-four-fifths">
                <input
                    className="input is-rounded"
                    type="text"
                    value={filters.title}
                    placeholder="Search for a book..."
                    onChange={e => onChangeSearch(e.target.value)}
                />
            </div>

            <div className="column">
                <div className="select is-rounded">
                    <select
                        value={filters.orderBy}
                        onChange={e => onChangeOrderBy(e.target.value)}
                    >
                        <option value="-price">Most expensive</option>
                        <option value="+price">Cheaper</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
