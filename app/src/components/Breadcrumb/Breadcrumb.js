import React from 'react';

const Breadcrumb = () => {
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li className="is-active">
                    <a href="/books">Books</a>
                </li>
            </ul>
        </nav>
    );
};

export default Breadcrumb;
