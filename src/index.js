import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import { store } from './scripts/store';

import AppHeader from './scripts/components/AppHeader.jsx';
import SearchPage from './scripts/containers/SearchPage.jsx';
import FavoritesPage from './scripts/components/FavoritesPage.jsx';
import BookPage from './scripts/components/BookPage.jsx';

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/" component={AppHeader} />
                <div className="container-fluid">
                    <Route path="/" component={SearchPage} exact />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/book/:id" component={BookPage} />
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
