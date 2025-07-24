import { useEffect, useState } from 'react';
import type { Person } from '../../types/person';
import { fetchPeople } from '../../api/swapi';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Button from '../Button';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    setQuery(savedQuery);
    fetchResults(savedQuery);
  }, []);

  const fetchResults = async (searchTerm: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPeople(searchTerm);
      setResults(data.results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const trimmed = query.trim();

    if (trimmed === '') {
      localStorage.removeItem('searchQuery');
    } else {
      localStorage.setItem('searchQuery', trimmed);
    }

    setQuery(trimmed);
    fetchResults(trimmed);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  if (shouldCrash) {
    throw new Error('Test crash in render');
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <SearchResults results={results} loading={loading} error={error} />
      <div className="w-full mx-auto max-w-3xl pb-8 text-right">
        <Button
          data-testid="error-button"
          onClick={() => setShouldCrash(true)}
          variant="danger"
        >
          Error Button
        </Button>
      </div>
    </>
  );
};

export default Search;
