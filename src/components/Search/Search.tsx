import { useEffect, useState } from 'react';
import type { Person } from '../../types/person';
import { fetchPeople } from '../../api/swapi';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Button from '../Button';
import useLocalStorage from '../../hooks/useLocalStorage';

function Search() {
  const [query, setQuery] = useLocalStorage<string>('searchQuery', '');
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);

  useEffect(() => {
    fetchResults(query);
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
}

export default Search;
