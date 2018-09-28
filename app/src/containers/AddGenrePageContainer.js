import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AddGenrePage } from './../pages';

import { addGenre } from './../redux/actions/genresActions';

import { AlertActions } from './../redux/actions/alertsActions';
const { clear: clearAlerts } = AlertActions;

class AddGenrePageContainer extends Component {
    componentWillUnmount() {
        this.props.clearAlerts();
    }

    onAddGenre = name => {
        this.props.addGenre({ name });
    };

    render() {
        const { alertStore } = this.props;

        return (
            <AddGenrePage
                alertStore={alertStore}
                onAddGenre={this.onAddGenre}
            />
        );
    }
}

const mapStateToProps = ({ alertStore }) => {
    return { alertStore };
};

export default withRouter(
    connect(
        mapStateToProps,
        { addGenre, clearAlerts }
    )(AddGenrePageContainer)
);
