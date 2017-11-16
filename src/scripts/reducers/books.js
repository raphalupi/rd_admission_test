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
    searchedBooks: [],
    currentBook: {},
    favoriteBooks: [],
};

const books = (state = initialState, action) => {
    switch (action.type) {
    case BOOKS_SEARCH_REQUEST:
        console.log(action);
        break;
    case BOOKS_SEARCH_SUCCESS:
        console.log(action);
        break;
    case BOOKS_SEARCH_FAILURE:
        console.log(action);
        break;
    case BOOK_FETCH_REQUEST:
        console.log(action);
        break;
    case BOOK_FETCH_SUCCESS:
        console.log(action);
        break;
    case BOOK_FETCH_FAILURE:
        console.log(action);
        break;
    case BOOK_ADD_FAVORITE:
        console.log(action);
        break;
    case BOOK_REMOVE_FAVORITE:
        console.log(action);
        break;
    case BOOKS_RETRIEVE_FAVORITES:
        console.log(action);
        break;
    case LOCATION_CHANGE:
        console.log(action);
        break;
    default:
        return state;
    }
};

export default books;
