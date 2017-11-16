import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import api from '../middlewares/api';
import appReducer from '../reducers';

let store = createStore(
    appReducer,
    applyMiddleware(thunk, api)
);

export {
    store
};
