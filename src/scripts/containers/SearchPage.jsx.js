import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchBooks } from '../actions/books';

import SearchPageComponent from '../components/SearchPage.jsx';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(q, sort, page, rowsPerPage) {
        console.log('onSearch', q, sort, page, rowsPerPage);

        const { onSearchBooks } = this.props;

        onSearchBooks(q, sort, page, rowsPerPage);
    }

    render() {
        const { searchResults } = this.props;
        return (
            <SearchPageComponent
                results={searchResults}
                onSearch={this.onSearch} />
        );
    }
}

SearchPage.propTypes = {
    searchResults: PropTypes.array,
    onSearchBooks: PropTypes.func.isRequired,
};

SearchPage.defaultProps = {
    searchResults: [],
};

const mapStateToProps = ({ books }) => {
    return {
        searchResults: books.searchedBooks,
    };
};

const mapDispatchToProps = {
    onSearchBooks: searchBooks,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
