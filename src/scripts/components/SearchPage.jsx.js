import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import classnames from 'classnames';
import {
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Pagination,
} from 'react-bootstrap';

import Book from './Book.jsx';

const styles = StyleSheet.create({
    form: {
        marginBottom: '15px',
    },

    formGroup: {
        width: '100%',
    },

    searchBox: {
        width: '100%',
    },

    sortOrder: {
        width: 'auto',
    },

    pageSize: {
        width: 'auto',
    },
});

const classes = {
    form: classnames(
        css(styles.form)
    ),

    formGroup: classnames(
        css(styles.formGroup)
    ),

    searchBox: classnames(
        css(styles.searchBox)
    ),

    sortOrder: classnames(
        css(styles.sortOrder)
    ),

    pageSize: classnames(
        css(styles.pageSize)
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
                maxButtons={6}
                items={availablePages}
                onSelect={this.updatePage} />);

        return (
            <div>
                <Form className={classes.form}>
                    <FormGroup controlId="formBasicText" className={classes.formGroup}>
                        <FormControl
                            bsSize="lg"
                            className={classes.searchBox}
                            type="text"
                            value={searchQuery}
                            placeholder="Search a Book"
                            onChange={(e) => this.handleOnChange(e)}
                            onKeyDown={(e) => this.handleKeyDown(e)} />

                        <FormControl
                            bsSize="lg"
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

                        <FormControl
                            bsSize="lg"
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
                    </FormGroup>
                </Form>

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

                {!isLoading && results.length ? pagination : null}
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
