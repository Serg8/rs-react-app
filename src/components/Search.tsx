import { Component } from 'react';

interface SearchState {
  query: string;
}

type SearchProps = object;

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleSearch = () => {
    const { query } = this.state;
    const trimmed = query.trim();

    if (trimmed === '') {
      localStorage.removeItem('searchQuery');
    } else {
      localStorage.setItem('searchQuery', trimmed);
    }

    this.setState({ query: trimmed });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <div className="w-full flex py-8 justify-center gap-x-4">
          <input
            className="w-full max-w-md px-4 py-2 border border-gray-300 outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            type="text"
            value={query}
            onChange={this.handleInputChange}
            placeholder="Enter a request"
          />
          <button
            onClick={this.handleSearch}
            className="border border-gray-300 py-2 px-4 hover:bg-gray-50"
          >
            Search
          </button>
        </div>
      </>
    );
  }
}

export default Search;
