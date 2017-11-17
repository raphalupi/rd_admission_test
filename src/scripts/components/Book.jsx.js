import React from 'react';
import PropTypes from 'prop-types';
import {
    Image
} from 'react-bootstrap';
import get from 'lodash.get';

const Book = ({
    bookInfo,
}) => {
    const thumbnailImage = get(bookInfo, 'imageLinks.thumbnail', null);

    return (
        <div className="flex flex-row mb4">
            <div className="flex-shrink-0 w-30 w-auto-ns">
                {thumbnailImage &&
                    (<a href={bookInfo.infoLink} rel="noreferrer noopener" target="_blank">
                        <Image src={thumbnailImage} thumbnail />
                    </a>)}
            </div>
            <div className="flex flex-column overflow-x-hidden ml3">
                <a
                    href={bookInfo.infoLink}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="b f3 truncate"
                    title={bookInfo.title}
                >
                    {bookInfo.title}
                </a>
                <div className="truncate">
                    <strong>Preview</strong>:
                    <a href={bookInfo.previewLink} rel="noreferrer noopener" target="_blank" className="truncate green ml1">
                        {bookInfo.previewLink}
                    </a>
                </div>
                {bookInfo.description ?
                    (<p style={{ maxHeight: '3em' }} className="overflow-y-hidden mt1 mb1">
                        {bookInfo.description}
                    </p>) : 'No description available'
                }
                <div>
                    <strong>Publisher</strong>: {bookInfo.publisher}, {bookInfo.publishedDate}
                </div>
                <div>
                    <strong>Authors</strong>: {bookInfo.authors.join(', ')}
                </div>
            </div>
        </div>
    );
};

Book.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
};

export default Book;
