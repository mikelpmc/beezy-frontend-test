import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AddBookPage } from './../pages';

import { retrieveGenres } from './../redux/actions/genresActions';
import { addBook } from './../redux/actions/booksActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class AddBookPageContainer extends Component {
    componentDidMount() {
        this.props.retrieveGenres();
    }

    componentWillUnmount() {
        this.props.clearAlerts();
    }

    onAddBook = (title, price, genreId) => {
        this.props.addBook({ title, price, genreId });
    };

    render() {
        const { genreStore, alertStore } = this.props;

        return (
            <AddBookPage
                genreStore={genreStore}
                alertStore={alertStore}
                onAddBook={this.onAddBook}
            />
        );
    }
}

const mapStateToProps = ({ genreStore, alertStore }) => {
    return { genreStore, alertStore };
};

export default withRouter(
    connect(
        mapStateToProps,
        { retrieveGenres, addBook, clearAlerts }
    )(AddBookPageContainer)
);
