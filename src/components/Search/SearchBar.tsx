import { Component } from 'react';

interface Props {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class SearchBar extends Component<Props> {
  render() {
    const { query, onChange, onSearch } = this.props;

    return (
      <div className="w-full flex py-8 justify-center gap-x-4">
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-300 outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Enter a request, e.g. C-3PO"
        />
        <button
          onClick={onSearch}
          className="border border-gray-300 py-2 px-4 hover:bg-gray-50"
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
