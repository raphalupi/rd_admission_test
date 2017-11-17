import { CALL_API } from '../middlewares/api';

export const BOOKS_SEARCH_REQUEST = 'BOOKS_SEARCH_REQUEST';
export const BOOKS_SEARCH_SUCCESS = 'BOOKS_SEARCH_SUCCESS';
export const BOOKS_SEARCH_FAILURE = 'BOOKS_SEARCH_FAILURE';

// Google books API key
const API_KEY = 'AIzaSyDrugRyOGelF2dsIfulTPqf_OFSTyrtDNI';

// Runs search on the API.
//   Encodes the 'q' parameter
//   Applies sort in the results (relevance or newest)
//   controlls the page to fetch and how many books per page
//   Brings only 'books' and uses a 'lite' projection for fewer data
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
