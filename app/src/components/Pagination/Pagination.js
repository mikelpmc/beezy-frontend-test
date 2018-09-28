import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({ limit, totalResults, filters }) => {
    const renderPagination = () => {
        const numPages = Math.round(totalResults / limit);
        const pagination = [];

        if (numPages > 1) {
            let prevCursor = 0;
            let nextCursor = 0;

            const { genre, prices, title, orderBy } = filters;

            for (let i = 0; i < numPages; i++) {
                const currPage = i + 1;

                if (currPage !== 1) {
                    nextCursor = prevCursor + limit;

                    prevCursor = nextCursor;
                }

                let newUrl = `/books?cursor=${nextCursor}&page=${currPage}&genre=${genre}&prices=${prices}&title=${title}&orderBy=${orderBy}`;

                pagination.push(
                    <li className="pagination-link" key={i}>
                        <Link to={newUrl}>{currPage}</Link>
                    </li>
                );
            }
        }

        return pagination;
    };

    return (
        <nav className="pagination is-rounded" aria-label="pagination">
            <ul className="pagination-list">{renderPagination()}</ul>
        </nav>
    );
};

export default Pagination;
