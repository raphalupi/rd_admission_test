import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Polyfills
import 'babel-polyfill';
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/symbol';
import 'core-js/es6/map';
import 'core-js/es6/set';

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
                <div className="container">
                    <Route path="/" component={SearchPage} exact />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/book/:id" component={BookPage} />
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
