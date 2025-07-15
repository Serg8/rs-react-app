import { Component } from 'react';
import type { Person } from '../../types/person';
import { fetchPeople } from '../../api/swapi';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Button from '../Button';

interface SearchState {
  query: string;
  results: Person[];
  loading: boolean;
  error: string | null;
  shouldCrash: boolean;
}

type SearchProps = object;

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
      results: [],
      loading: false,
      error: null,
      shouldCrash: false,
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ query: savedQuery }, this.fetchResults);
  }

  fetchResults = async () => {
    const { query } = this.state;
    const trimmed = query.trim();

    this.setState({ loading: true, error: null });

    try {
      const data = await fetchPeople(trimmed);
      this.setState({ results: data.results, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  };

  handleSearch = () => {
    const trimmed = this.state.query.trim();

    if (trimmed === '') {
      localStorage.removeItem('searchQuery');
    } else {
      localStorage.setItem('searchQuery', trimmed);
    }

    this.setState({ query: trimmed }, this.fetchResults);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { query, results, loading, error, shouldCrash } = this.state;

    if (shouldCrash) {
      throw new Error('Test crash in render');
    }

    return (
      <>
        <SearchBar
          query={query}
          onChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <SearchResults results={results} loading={loading} error={error} />
        <div className="w-full mx-auto max-w-3xl pb-8 text-right">
          <Button
            onClick={() => this.setState({ shouldCrash: true })}
            variant="danger"
          >
            Error Button
          </Button>
        </div>
      </>
    );
  }
}

export default Search;
