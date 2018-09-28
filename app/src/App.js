import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import { NotFound } from './pages';
import {
    BooksListPage,
    AddBookPage,
    EditBookPage,
    GenresListPage,
    AddGenrePage,
    EditGenrePage
} from './containers';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />

                <Switch>
                    <Route exact path="/" component={BooksListPage} />
                    <Route exact path="/books" component={BooksListPage} />
                    <Route path="/books/add" component={AddBookPage} />
                    <Route
                        path="/books/edit/:bookId"
                        component={EditBookPage}
                    />

                    <Route exact path="/genres" component={GenresListPage} />
                    <Route path="/genres/add" component={AddGenrePage} />
                    <Route
                        path="/genres/edit/:genreId"
                        component={EditGenrePage}
                    />

                    <NotFound />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
