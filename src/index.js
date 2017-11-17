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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons/css/tachyons.min.css';

import { store } from './scripts/store';

import AppHeader from './scripts/components/AppHeader.jsx';
import SearchPage from './scripts/containers/SearchPage.jsx';

let basename = '';

/* eslint-disable no-undef */
// fixes the basename for github pages
if (NODE_ENV.trim() === 'production') {
    basename = '/rd_admission_test';
}
/* eslint-enable no-undef */

render(
    <Provider store={store}>
        <BrowserRouter basename={basename}>
            <div>
                <Route path="/" component={AppHeader} />
                <div className="container">
                    <Route path="/" component={SearchPage} exact />
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

/*
    Removing the following routes as I couldn't implement them
    <Route path="/favorites" component={FavoritesPage} />
    <Route path="/book/:id" component={BookPage} />
*/
