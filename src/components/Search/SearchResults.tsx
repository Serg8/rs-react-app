import type { Person } from '../../types/person';
import CardList from '../CardList';

interface SearchResultsProps {
  results: Person[];
  loading: boolean;
  error: string | null;
}

function SearchResults({ results, loading, error }: SearchResultsProps) {
  return (
    <div className="w-full mx-auto max-w-3xl pb-8">
      {loading && (
        <div
          data-testid="loading"
          className="flex justify-center items-center py-8"
        >
          <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <p data-testid="search-error" className="text-center text-red-500">
          Error: {error}
        </p>
      )}
      {!loading && !error && results.length === 0 && (
        <p data-testid="search-empty" className="text-center text-gray-500">
          No results found
        </p>
      )}
      {!loading && !error && results.length > 0 && (
        <CardList results={results} />
      )}
    </div>
  );
}

export default SearchResults;
