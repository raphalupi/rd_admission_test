import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    ControlLabel,
    FormControl,
    Pagination,
} from 'react-bootstrap';

import Book from './Book.jsx';

const classes = {
    form: classnames(
        'mb3'
    ),

    formGroup: classnames(
        'w-100'
    ),

    formGroupFilters: classnames(
        'flex',
        'flex-row',
        'mb4'
    ),

    searchBox: classnames(
        'w-100'
    ),

    sortOrder: classnames(
        'w-auto'
    ),

    pageSize: classnames(
        'w-auto'
    ),

    filterLabelWrapper: classnames(
        'flex',
        'flex-column',
        'mr3'
    ),
};

class SearchPage extends Component {
    constructor(props) {
        super(props);

        const sortTypes = ['relevance', 'newest'];
        const pageSizes = [10, 20, 40];

        this.state = {
            searchQuery: '',
            lastQuery: '',
            sortOrder: sortTypes[0],
            sortTypes,
            page: 0,
            resultsPerPage: pageSizes[0],
            pageSizes,
        };

        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    handleSortOrderChange(e) {
        this.setState({
            sortOrder: e.target.value,
            page: 0,
        }, () => {
            this.performSearch();
        });
    }

    handlePageSizeChange(e) {
        this.setState({
            resultsPerPage: e.target.value,
            page: 0,
        }, () => {
            this.performSearch();
        });
    }

    handleOnChange(e) {
        this.setState({
            searchQuery: e.target.value,
        });
    }

    handleKeyDown(e) {
        const { searchQuery } = this.state;

        if (e.which === 13) { // ENTER
            e.preventDefault();
            if (searchQuery !== '') {
                this.setState({
                    lastQuery: searchQuery,
                    page: 0,
                }, () => {
                    this.performSearch();
                });
            }
        }
    }

    updatePage(newPage) {
        this.setState({
            page: newPage - 1,
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        const { onSearch } = this.props;
        const { searchQuery, sortOrder, page, resultsPerPage } = this.state;

        if (searchQuery !== '') {
            onSearch(searchQuery, sortOrder, page, resultsPerPage);
        }
    }

    render() {
        const { results, totalResults, isLoading } = this.props;
        const { searchQuery, lastQuery, sortOrder, sortTypes, page, resultsPerPage, pageSizes } = this.state;

        const noResults = lastQuery !== '' && results.length === 0;
        const availablePages = Math.ceil(totalResults / resultsPerPage);

        const pagination = (
            <Pagination
                activePage={page + 1}
                boundaryLinks
                prev
                next
                maxButtons={10}
                items={availablePages}
                onSelect={this.updatePage} />);

        return (
            <div>
                <form className={classes.form}>
                    <FormControl
                        bsSize="lg"
                        className={classes.searchBox}
                        type="text"
                        value={searchQuery}
                        placeholder="Search a Book"
                        onChange={(e) => this.handleOnChange(e)}
                        onKeyDown={(e) => this.handleKeyDown(e)} />
                </form>

                <form className={classes.formGroupFilters}>
                    <div className={classes.filterLabelWrapper}>
                        <ControlLabel>Sort by:</ControlLabel>
                        <FormControl
                            className={classes.sortOrder}
                            componentClass="select"
                            placeholder="Sort by"
                            value={sortOrder}
                            onChange={(e) => this.handleSortOrderChange(e)}
                        >
                            {sortTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </FormControl>
                    </div>

                    <div className={classes.filterLabelWrapper}>
                        <ControlLabel>Results per page:</ControlLabel>
                        <FormControl
                            className={classes.pageSize}
                            componentClass="select"
                            placeholder="Page size"
                            value={resultsPerPage}
                            onChange={(e) => this.handlePageSizeChange(e)}
                        >
                            {pageSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </FormControl>
                    </div>
                </form>

                {isLoading ? (<span>Loading...</span>) : null}

                {noResults && !isLoading ?
                    (<h3>No results available for query: {lastQuery}</h3>) :
                    null
                }

                {!isLoading && results.map(result => (
                    <Book
                        key={result.id}
                        bookInfo={result.volumeInfo}
                        onFavoriteToggle={() => {}} />
                ))}

                {!isLoading && results.length ?
                    (<div className="tc">{pagination}</div>) :
                    null
                }
            </div>
        );
    }
}

SearchPage.propTypes = {
    results: PropTypes.array,
    totalResults: PropTypes.number,
    isLoading: PropTypes.bool,
    hasError: PropTypes.any,
    onSearch: PropTypes.func.isRequired,
};

SearchPage.defaultProps = {
    results: [],
    totalResults: 0,
    isLoading: false,
    hasError: null,
};

export default SearchPage;
