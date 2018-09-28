import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from './../../assets/images/logo.svg';
import './Navbar.css';

class Navbar extends Component {
    state = {
        navbar: false,
        burguer: false
    };

    toggleNavbar = () => {
        const prevState = this.state;

        this.setState({
            navbar: !prevState.navbar,
            burguer: !prevState.burguer
        });
    };
    render() {
        const { location } = this.props;
        const { navbar, burger } = this.state;

        return (
            <nav className="navbar is-light">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                        <img
                            src={logo}
                            alt="Book store react app"
                            width="112"
                            height="28"
                        />
                        <span className="navbar-item__title">Book Store</span>
                    </Link>

                    <a
                        role="button"
                        className={`navbar-burger ${burger ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={this.toggleNavbar}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div className={`navbar-menu ${navbar ? 'is-active' : ''}`}>
                    <div className="navbar-end">
                        <Link
                            to="/books"
                            className={`navbar-item ${
                                location.pathname === '/' ||
                                location.pathname === '/books'
                                    ? 'is-active'
                                    : ''
                            }`}
                        >
                            Books
                        </Link>
                        <Link
                            to="/books/add"
                            className={`navbar-item ${
                                location.pathname === '/books/add'
                                    ? 'is-active'
                                    : ''
                            }`}
                        >
                            Add Book
                        </Link>
                        <Link
                            to="/genres"
                            className={`navbar-item ${
                                location.pathname === '/genres'
                                    ? 'is-active'
                                    : ''
                            }`}
                        >
                            Genres
                        </Link>
                        <Link
                            to="/genres/add"
                            className={`navbar-item ${
                                location.pathname === '/genres/add'
                                    ? 'is-active'
                                    : ''
                            }`}
                        >
                            Add Genre
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
