import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchResults from '../../../components/Search/SearchResults';

describe('SearchResults', () => {
  test('Renders loading spinner when loading is true', () => {
    render(<SearchResults loading={true} error={null} results={[]} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('Renders error message when error is present', () => {
    render(
      <SearchResults
        loading={false}
        error="Something went wrong"
        results={[]}
      />
    );
    expect(screen.getByTestId('search-error')).toBeInTheDocument();
  });

  test('Renders no results message when results are empty and no error', () => {
    render(<SearchResults loading={false} error={null} results={[]} />);
    expect(screen.getByTestId('search-empty')).toBeInTheDocument();
  });
});
