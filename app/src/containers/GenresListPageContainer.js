import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GenresListPage } from './../pages';

import { retrieveGenres, removeGenre } from './../redux/actions/genresActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class GenresListPageContainer extends Component {
    componentDidMount() {
        this.props.retrieveGenres({});
    }

    onRemoveGenre = genreId => {
        this.props.removeGenre({ genreId });
    };

    render() {
        const { genreStore, alertStore } = this.props;

        return (
            <GenresListPage
                genres={genreStore.genres}
                alertStore={alertStore}
                onRemoveGenre={this.onRemoveGenre}
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
        { retrieveGenres, removeGenre, clearAlerts }
    )(GenresListPageContainer)
);
