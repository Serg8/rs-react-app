import { Component } from 'react';
import CardList from './CardList.tsx';
import type { Person } from '../types/person.ts';
import Button from './Button';

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
    this.setState({ query: savedQuery }, () => {
      this.fetchResults();
    });
  }

  fetchResults = async () => {
    const { query } = this.state;
    const trimmed = query.trim();

    this.setState({ loading: true, error: null });

    const url = trimmed
      ? `https://swapi.dev/api/people/?search=${encodeURIComponent(trimmed)}`
      : 'https://swapi.dev/api/people/';

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

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
    const { query } = this.state;
    const trimmed = query.trim();

    if (trimmed === '') {
      localStorage.removeItem('searchQuery');
    } else {
      localStorage.setItem('searchQuery', trimmed);
    }

    this.setState({ query: trimmed }, () => {
      this.fetchResults();
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Test crash in render');
    }
    const { query, results, loading, error } = this.state;

    return (
      <>
        <div className="w-full flex py-8 justify-center gap-x-4">
          <input
            className="w-full max-w-md px-4 py-2 border border-gray-300 outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            type="text"
            value={query}
            onChange={this.handleInputChange}
            placeholder="Enter a request, e.g. C-3PO"
          />
          <Button onClick={this.handleSearch}>Search</Button>
        </div>
        <div className="w-full mx-auto max-w-3xl pb-8">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            </div>
          )}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && results.length === 0 && (
            <p className="text-center text-gray-500">No results found</p>
          )}
          {!loading && !error && results.length > 0 && (
            <CardList results={results} />
          )}
        </div>
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
