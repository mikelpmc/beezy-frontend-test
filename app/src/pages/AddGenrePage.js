import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { GenreForm, AlertMessage } from '../components';

class AddGenrePage extends Component {
    state = {
        name: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitGenre = e => {
        e.preventDefault();

        const { name } = this.state;

        this.props.onAddGenre(name);
    };

    render() {
        const { name } = this.state;
        const {
            alertStore: { type, message }
        } = this.props;

        return (
            <section className="section">
                <div className="container">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/genres">Genres</Link>
                            </li>
                            <li className="is-active">
                                <a href="#">Add new genre</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="columns form__container">
                        <div className="column is-half">
                            <h1 className="title">Add a new Genre</h1>

                            <AlertMessage type={type} message={message} />

                            <div className="card">
                                <div className="card-content">
                                    <GenreForm
                                        name={name}
                                        handleChange={this.handleChange}
                                        onSubmitGenre={this.onSubmitGenre}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AddGenrePage;
