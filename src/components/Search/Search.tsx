import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Person } from '../../types/person';
import { fetchPeople } from '../../api/swapi';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import useLocalStorage from '../../hooks/useLocalStorage';

function Search() {
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const fetchResults = useCallback(
    async (searchTerm: string, pageNumber: number) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPeople(searchTerm, pageNumber);
        const maxPage = Math.ceil(data.count / 10);
        if (pageNumber > maxPage && maxPage > 0) {
          setSearchParams({ page: String(maxPage) });
          return;
        }
        setResults(data.results);
        setTotalCount(data.count);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    fetchResults(query, page);
  }, [fetchResults, query, page]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setQuery(trimmed);
    setSearchParams({ page: '1' });
    fetchResults(trimmed, 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
    fetchResults(query, newPage);
  };

  return (
    <>
      <SearchBar
        query={inputValue}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <SearchResults results={results} loading={loading} error={error} />
      {results.length > 0 && (
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Search;
