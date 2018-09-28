import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';

import { BooksListPage } from './../pages';

import { retrieveBooks, removeBook } from './../redux/actions/booksActions';
import { retrieveGenres } from './../redux/actions/genresActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class BooksListPageContainer extends Component {
    state = {
        filters: {
            cursor: 0,
            page: 0,
            genre: 'all',
            prices: [0, 20],
            title: '',
            orderBy: '-price'
        }
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        const {
            cursor,
            page,
            genre,
            prices,
            title,
            orderBy
        } = this._getUrlParams(values);

        this.setState(
            {
                filters: { cursor, page, genre, prices, title, orderBy }
            },
            () => {
                this.props.retrieveBooks({
                    cursor,
                    genreId: genre,
                    prices,
                    title,
                    orderBy
                });

                this.props.retrieveGenres();
            }
        );

        // Listener to url changes to refresh ui
        this.unlisten = this.props.history.listen(location => {
            const { pathname } = location;

            if (pathname === '/books' || pathname === '/') {
                const values = queryString.parse(location.search);

                const {
                    cursor,
                    page,
                    genre,
                    prices,
                    title,
                    orderBy
                } = this._getUrlParams(values);

                this.setState(
                    {
                        filters: { cursor, page, genre, prices, title, orderBy }
                    },
                    () => {
                        this.props.retrieveBooks({
                            cursor,
                            genreId: genre,
                            prices,
                            title,
                            orderBy
                        });
                    }
                );
            }
        });
    }

    componentWillUnmount() {
        this.props.clearAlerts();
        this.unlisten();
    }

    _getUrlParams = values => {
        const cursor =
            'cursor' in values ? values.cursor : this.state.filters.cursor;
        const page = 'page' in values ? values.page : this.state.filters.page;
        const genre =
            'genre' in values ? values.genre : this.state.filters.genre;
        const prices =
            'prices' in values
                ? values.prices.split(',').map(price => Number(price))
                : this.state.filters.prices;
        const title =
            'title' in values ? values.title : this.state.filters.title;
        const orderBy =
            'orderBy' in values ? values.orderBy : this.state.filters.orderBy;

        return {
            cursor,
            page,
            genre,
            prices,
            title,
            orderBy
        };
    };

    onChangeGenreFilter = genre => {
        const { pathname } = this.props.location;
        const { prices, title, orderBy } = this.state.filters;

        let newUrl = `${pathname}?cursor=0&page=1&genre=${genre}&prices=${prices}&title=${title}&orderBy=${orderBy}`;

        this.props.history.push(newUrl);
    };

    onChangePriceRange = prices => {
        const { pathname } = this.props.location;
        const { genre, title, orderBy } = this.state.filters;

        let newUrl = `${pathname}?cursor=0&page=1&genre=${genre}&prices=${prices}&title=${title}&orderBy=${orderBy}`;

        this.props.history.push(newUrl);
    };

    onChangeSearch = title => {
        const { pathname } = this.props.location;
        const { genre, prices, orderBy } = this.state.filters;

        let newUrl = `${pathname}?cursor=0&page=1&genre=${genre}&prices=${prices}&title=${title}&orderBy=${orderBy}`;

        this.props.history.push(newUrl);
    };

    onChangeOrderBy = orderBy => {
        const { pathname } = this.props.location;
        const { genre, prices, title } = this.state.filters;

        let newUrl = `${pathname}?cursor=0&page=1&genre=${genre}&prices=${prices}&title=${title}&orderBy=${orderBy}`;

        this.props.history.push(newUrl);
    };

    onRemoveBook = bookId => {
        const { filters } = this.state;

        this.props.removeBook({ bookId, filters });
    };

    render() {
        const { bookStore, genreStore, alertStore } = this.props;
        const { filters } = this.state;

        return (
            <BooksListPage
                bookStore={bookStore}
                genreStore={genreStore}
                alertStore={alertStore}
                filters={filters}
                onChangeGenreFilter={this.onChangeGenreFilter}
                onChangePriceRange={this.onChangePriceRange}
                onChangeSearch={this.onChangeSearch}
                onChangeOrderBy={this.onChangeOrderBy}
                onRemoveBook={this.onRemoveBook}
            />
        );
    }
}

const mapStateToProps = ({ bookStore, genreStore, alertStore }) => {
    return { bookStore, genreStore, alertStore };
};

export default withRouter(
    connect(
        mapStateToProps,
        { retrieveBooks, removeBook, retrieveGenres, clearAlerts }
    )(BooksListPageContainer)
);
