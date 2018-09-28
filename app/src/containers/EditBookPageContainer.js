import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { EditBookPage } from './../pages';

import { retrieveGenres } from './../redux/actions/genresActions';
import { retrieveBookById, updateBook } from './../redux/actions/booksActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class EditBookPageContainer extends Component {
    componentDidMount() {
        const { bookId } = this.props.match.params;

        this.props.retrieveGenres();
        this.props.retrieveBookById({ bookId });
    }

    componentWillUnmount() {
        this.props.clearAlerts();
    }

    onUpdateBook = (title, price, genreId) => {
        const { bookId } = this.props.match.params;

        debugger;

        this.props.updateBook({ bookId, title, price, genreId });
    };

    render() {
        const { bookStore, genreStore, alertStore } = this.props;

        return (
            <EditBookPage
                genreStore={genreStore}
                bookStore={bookStore}
                alertStore={alertStore}
                onUpdateBook={this.onUpdateBook}
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
        { retrieveBookById, retrieveGenres, updateBook, clearAlerts }
    )(EditBookPageContainer)
);
