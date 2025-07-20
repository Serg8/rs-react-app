import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchBar from '../../../components/Search/SearchBar';

describe('SearchBar', () => {
  test('Renders search input and search button', () => {
    const mockOnChange = jest.fn();
    const mockOnSearch = jest.fn();

    render(
      <SearchBar query="" onChange={mockOnChange} onSearch={mockOnSearch} />
    );

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    const button = screen.getByTestId('search-button');
    expect(button).toBeInTheDocument();
  });
});
