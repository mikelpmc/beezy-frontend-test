import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { BookForm, AlertMessage } from '../components';

class AddBookPage extends Component {
    state = {
        title: '',
        price: 0,
        genreId: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitBook = e => {
        e.preventDefault();

        const { title, price, genreId } = this.state;

        this.props.onAddBook(title, price, genreId);
    };

    renderSelectGenres = () => {
        const { genres } = this.props.genreStore;
        const { genreId } = this.state;

        return (
            <div className="select is-rounded">
                <select
                    className="select__input"
                    onChange={this.handleChange}
                    name="genreId"
                >
                    <option value={genreId}>Select a genre</option>
                    {genres &&
                        genres.length &&
                        genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                </select>
            </div>
        );
    };

    render() {
        const { title, price } = this.state;
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
                                <Link to="/books">Books</Link>
                            </li>
                            <li className="is-active">
                                <a href="">Add new book</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="columns form__container">
                        <div className="column is-half">
                            <h1 className="title">Add a new Book</h1>

                            <AlertMessage type={type} message={message} />

                            <div className="card">
                                <div className="card-content">
                                    <BookForm
                                        title={title}
                                        price={price}
                                        handleChange={this.handleChange}
                                        renderSelectGenres={
                                            this.renderSelectGenres
                                        }
                                        onSubmitBook={this.onSubmitBook}
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

export default AddBookPage;
