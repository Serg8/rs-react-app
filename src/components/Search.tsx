import { Component } from 'react';

interface Person {
  name: string;
  gender: string;
  height: string;
  mass: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
}

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
          <button
            onClick={this.handleSearch}
            className="border border-gray-300 py-2 px-4 hover:bg-gray-50"
          >
            Search
          </button>
        </div>
        <div className="w-full mx-auto max-w-3xl pb-8">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && results.length === 0 && (
            <p className="text-center text-gray-500">No results found</p>
          )}
          {!loading && !error && results.length > 0 && (
            <ul className="space-y-4">
              {results.map((person) => (
                <li
                  key={person.name}
                  className="p-4 border border-gray-200 rounded-md shadow-sm flex gap-2 flex-col md:flex-row"
                >
                  <h3 className="font-semibold text-lg w-full md:w-1/3 shrink-0">
                    {person.name}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Gender: {person.gender}, Height: {person.height} cm, Mass:{' '}
                    {person.mass} kg, Birth Year: {person.birth_year}, Eye
                    Color: {person.eye_color}, Hair Color: {person.hair_color}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full mx-auto max-w-3xl pb-8 text-right">
          <button
            onClick={() => this.setState({ shouldCrash: true })}
            className="border border-red-400 py-2 px-4 text-red-600 hover:bg-red-50"
          >
            Error Button
          </button>
        </div>
      </>
    );
  }
}

export default Search;
