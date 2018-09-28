import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { EditGenrePage } from './../pages';

import {
    retrieveGenreById,
    updateGenre
} from './../redux/actions/genresActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class EditGenrePageContainer extends Component {
    componentDidMount() {
        const { genreId } = this.props.match.params;

        this.props.retrieveGenreById({ genreId });
    }

    componentWillUnmount() {
        this.props.clearAlerts();
    }

    onUpdateGenre = name => {
        const { genreId } = this.props.match.params;

        this.props.updateGenre({ genreId, name });
    };

    render() {
        const { genreStore, alertStore } = this.props;

        return (
            <EditGenrePage
                genreStore={genreStore}
                alertStore={alertStore}
                onUpdateGenre={this.onUpdateGenre}
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
        { retrieveGenreById, updateGenre, clearAlerts }
    )(EditGenrePageContainer)
);
