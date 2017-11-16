import update from 'immutability-helper';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    BOOKS_SEARCH_REQUEST,
    BOOKS_SEARCH_SUCCESS,
    BOOKS_SEARCH_FAILURE,
    BOOK_FETCH_REQUEST,
    BOOK_FETCH_SUCCESS,
    BOOK_FETCH_FAILURE,
    BOOK_ADD_FAVORITE,
    BOOK_REMOVE_FAVORITE,
    BOOKS_RETRIEVE_FAVORITES,
} from '../actions/books';

const initialState = {
    searchBooksLoading: false,
    searchBooksError: null,
    searchBooksTotalItems: 0,
    searchBooksItems: [],
    currentBook: {},
    currentBookLoading: false,
    currentBookError: null,
    favoriteBooks: [],
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
        console.log(action);
        return state;
    }

    case BOOK_FETCH_REQUEST: {
        console.log(action);
        return state;
    }

    case BOOK_FETCH_SUCCESS: {
        console.log(action);
        return state;
    }

    case BOOK_FETCH_FAILURE: {
        console.log(action);
        return state;
    }

    case BOOK_ADD_FAVORITE: {
        console.log(action);
        return state;
    }

    case BOOK_REMOVE_FAVORITE: {
        console.log(action);
        return state;
    }

    case BOOKS_RETRIEVE_FAVORITES: {
        console.log(action);
        return state;
    }

    case LOCATION_CHANGE: {
        console.log(action);
        return state;
    }

    default: {
        return state;
    }

    }
};

export default books;
