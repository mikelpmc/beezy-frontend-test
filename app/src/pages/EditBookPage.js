import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { BookForm, AlertMessage } from '../components';

class EditBookPage extends Component {
    state = {
        title: '',
        price: 0,
        genreId: ''
    };

    componentDidUpdate(prevProps) {
        if (
            !Object.keys(prevProps.bookStore.book).length ||
            prevProps.bookStore.book.id !== this.props.bookStore.book.id
        ) {
            const {
                title,
                price,
                genre: { id: genreId }
            } = this.props.bookStore.book;

            this.setState({
                title,
                price,
                genreId
            });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitBook = e => {
        e.preventDefault();

        const { title, price, genreId } = this.state;

        this.props.onUpdateBook(title, price, genreId);
    };

    renderSelectGenres = () => {
        const { genres } = this.props.genreStore;
        const { book } = this.props.bookStore;

        const defaultValue =
            Object.keys(book).length && this.state.genreId === ''
                ? book.genre.id
                : this.state.genreId;

        return (
            <div className="select is-rounded">
                <select
                    className="select__input"
                    value={defaultValue}
                    onChange={this.handleChange}
                    name="genreId"
                >
                    <option value="">Select a genre</option>
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
                                <a href="#">{title}</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="columns form__container">
                        <div className="column is-half">
                            <h1 className="title">Edit Book</h1>

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
                                        submitButtonText="Edit Book"
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

export default EditBookPage;
