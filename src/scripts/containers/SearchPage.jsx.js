import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchBooks } from '../actions/books';

import SearchPageComponent from '../components/SearchPage.jsx';

// Renders the serach page providing the search results, loading state and errors from the store.
class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(q, sort, page, rowsPerPage) {
        const { onSearchBooks } = this.props;
        onSearchBooks(q, sort, page, rowsPerPage);
    }

    render() {
        const { searchResults, totalResults, isLoading, hasError } = this.props;
        return (
            <SearchPageComponent
                results={searchResults}
                totalResults={totalResults}
                isLoading={isLoading}
                hasError={hasError}
                onSearch={this.onSearch} />
        );
    }
}

SearchPage.propTypes = {
    searchResults: PropTypes.array,
    totalResults: PropTypes.number,
    isLoading: PropTypes.bool,
    hasError: PropTypes.any,
    onSearchBooks: PropTypes.func.isRequired,
};

SearchPage.defaultProps = {
    searchResults: [],
    totalResults: 0,
    isLoading: false,
    hasError: null,
};

const mapStateToProps = ({ books }) => ({
    searchResults: books.searchBooksItems,
    totalResults: books.searchBooksTotalItems,
    isLoading: books.searchBooksLoading,
    hasError: books.searchBooksError,
});

const mapDispatchToProps = {
    onSearchBooks: searchBooks,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
