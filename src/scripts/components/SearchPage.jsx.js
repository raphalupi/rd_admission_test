import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        const sortTypes = ['relevance', 'newest'];

        this.state = {
            searchQuery: '',
            lastQuery: '',
            sortOrder: sortTypes[0],
            sortTypes,
            page: 0,
            resultsPerPage: 10,
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            searchQuery: e.target.value,
        });
    }

    handleKeyDown(e) {
        const { onSearch } = this.props;
        const { searchQuery, sortOrder, page, resultsPerPage } = this.state;

        if (e.which === 13) { // ENTER
            e.preventDefault();
            onSearch(searchQuery, sortOrder, page, resultsPerPage);
            this.setState({
                lastQuery: searchQuery,
            });
        }
    }

    render() {
        const { results } = this.props;
        const { searchQuery, lastQuery, sortOrder, page, resultsPerPage } = this.state;

        const noResults = lastQuery !== '' && results.length === 0;

        return (
            <div>
                <form>
                    <FormGroup controlId="formBasicText">
                        <FormControl
                            bsSize="lg"
                            type="text"
                            value={searchQuery}
                            placeholder="Search a Book"
                            onChange={(e) => this.handleOnChange(e)}
                            onKeyDown={(e) => this.handleKeyDown(e)} />
                    </FormGroup>
                </form>

                {noResults ?
                    (<h3>No results available for query: '{lastQuery}'</h3>) :
                    null
                }
            </div>
        );
    }
}

SearchPage.propTypes = {
    results: PropTypes.array,
    onSearch: PropTypes.func.isRequired,
};

SearchPage.defaultProps = {
    results: [],
};

export default SearchPage;
