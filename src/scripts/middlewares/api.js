import fetch from 'isomorphic-fetch';
import merge from 'lodash.merge';

export const CALL_API = Symbol('Call API');

export class ErrorWithResponse extends Error {
    constructor(message, payload) {
        super(message);
        this.message = message;
        this.payload = payload;
    }
}

// uses the 'fetch' module to make a request
const doAPIRequest = (
    endpointURL,
    options = {},
    getResponse = r => r
) => {
    if (!endpointURL) {
        throw new Error('API request endpoint is required.');
    }

    const fetchOptions = merge({}, options, {
        method: options.method || 'GET',
    });

    return (
        fetch(endpointURL, fetchOptions).
            then((response) => {
                if (!response.ok) {
                    throw new ErrorWithResponse('Fetch failed', response);
                }

                const { headers } = response;
                const contentType = headers.get('content-type') || '';

                if (/text\/html/.test(contentType)) {
                    location.reload();
                }

                if (contentType.indexOf('application/json') > -1) {
                    return response.json();
                }
                return response.text();
            }).
            then(getResponse));
};

export default ({ dispatch }) => next => (action) => {
    const callAPI = action[CALL_API];
    const isAPICall = typeof callAPI !== 'undefined';

    if (!isAPICall) {
        return next(action);
    }

    const {
        endpoint,
        types,
        options,
        getResponse,
        requestPayload,
        successPayload,
        failurePayload,
    } = callAPI;

    if (types.length !== 3) {
        throw new Error(`API middleware requires 3 action types. ${types.length} where given.`);
    }

    const [requestType, responseType, failureType] = types;

    // dispatch the request action
    dispatch({
        type: requestType,
        ...requestPayload
    });

    // waits for the request to finish before dispatching either the success action or the failure action
    return (
        doAPIRequest(endpoint, options, getResponse).
            then(
                response => dispatch({ response, type: responseType, ...successPayload }),
                (error) => {
                    if (!error.payload) {
                        dispatch({
                            error,
                            type: failureType,
                            ...failurePayload,
                        });
                    } else {
                        error.payload.json().then(
                            (payload) => {
                                dispatch({
                                    error,
                                    type: failureType,
                                    payload,
                                    ...failurePayload,
                                });
                            }).
                            catch(() => {
                                dispatch({
                                    error,
                                    type: failureType,
                                    ...failurePayload,
                                });
                            });
                    }
                }
            )
    );
};
