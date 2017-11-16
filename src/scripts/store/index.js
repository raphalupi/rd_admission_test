import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers';

let store = createStore(
    appReducer,
    applyMiddleware(thunk)
);

export {
    store
};
