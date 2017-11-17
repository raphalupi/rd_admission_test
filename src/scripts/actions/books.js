import { CALL_API } from '../middlewares/api';

export const BOOKS_SEARCH_REQUEST = 'BOOKS_SEARCH_REQUEST';
export const BOOKS_SEARCH_SUCCESS = 'BOOKS_SEARCH_SUCCESS';
export const BOOKS_SEARCH_FAILURE = 'BOOKS_SEARCH_FAILURE';

export const BOOK_FETCH_REQUEST = 'BOOK_FETCH_REQUEST';
export const BOOK_FETCH_SUCCESS = 'BOOK_FETCH_SUCCESS';
export const BOOK_FETCH_FAILURE = 'BOOK_FETCH_FAILURE';

export const BOOK_ADD_FAVORITE = 'BOOK_ADD_FAVORITE';
export const BOOK_REMOVE_FAVORITE = 'BOOK_REMOVE_FAVORITE';
export const BOOKS_RETRIEVE_FAVORITES = 'BOOKS_RETRIEVE_FAVORITES';

const API_KEY = 'AIzaSyDrugRyOGelF2dsIfulTPqf_OFSTyrtDNI';

// runs search on the API
export const searchBooks = (q, sort, page, pageSize) => (dispatch) => {
    const endpointBase = 'https://www.googleapis.com/books/v1/volumes';

    const queryParams = [
        `q=${encodeURI(q)}`,
        `startIndex=${page * pageSize}`,
        `maxResults=${pageSize}`,
        `orderBy=${sort}`,
        'printType=books',
        'projection=lite',
        `key=${API_KEY}`,
    ];

    return dispatch({
        [CALL_API]: {
            endpoint: `${endpointBase}?${queryParams.join('&')}`,
            types: [
                BOOKS_SEARCH_REQUEST,
                BOOKS_SEARCH_SUCCESS,
                BOOKS_SEARCH_FAILURE,
            ],
            options: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        }
    });
};

/*
// fetches a book with its id
export const fetchBook = (bookID) => {

};

// add a book id to the favorite list
export const addToFavorites = (bookID) => {

};

// remove a book id from the favorite list
export const removeFromFavorites = (bookID) => {

};

// get all favorite books' ids from local storage
export const retrieveAllFavorites = (bookID) => {

};

// fetchess all favorite books' ids from the api
export const fetchAllFavorites = (bookID) => {

};
*/
