import update from 'immutability-helper';

import {
    BOOKS_SEARCH_REQUEST,
    BOOKS_SEARCH_SUCCESS,
    BOOKS_SEARCH_FAILURE,
} from '../actions/books';

const initialState = {
    searchBooksLoading: false,
    searchBooksError: null,
    searchBooksTotalItems: 0,
    searchBooksItems: [],
};

const books = (state = initialState, action) => {
    switch (action.type) {
    case BOOKS_SEARCH_REQUEST: {
        return update(state, {
            searchBooksLoading: {
                $set: true,
            },
        });
    }

    case BOOKS_SEARCH_SUCCESS: {
        const { response } = action;

        return update(state, {
            searchBooksLoading: {
                $set: false,
            },
            searchBooksError: {
                $set: null,
            },
            searchBooksTotalItems: {
                $set: response.totalItems,
            },
            searchBooksItems: {
                $set: response.items,
            },
        });
    }
    case BOOKS_SEARCH_FAILURE: {
        const { response } = action;

        return update(state, {
            searchBooksLoading: {
                $set: false,
            },
            searchBooksError: {
                $set: response,
            },
        });
    }

    default: {
        return state;
    }

    }
};

export default books;
