import React from 'react';

const BookPage = ({ match }) => {
    const bookID = match.params.id;

    return (
        <div>
            <h1>Book Page: ID {bookID}</h1>
        </div>
    );
};

export default BookPage;
