import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    return (
        <div>
            <h1>Favorites Page</h1>
            <Link to="/book/1">Book 1</Link>
        </div>
    );
};

export default FavoritesPage;
