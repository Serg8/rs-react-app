import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../../components/Search/Search';
import ErrorBoundary from '../../../components/ErrorBoundary';

describe('Search component', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
    localStorage.clear();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test('Triggers error boundary when Error Button is clicked', async () => {
    render(
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    );

    const errorButton = screen.getByTestId('error-button');
    await userEvent.click(errorButton);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  test('Shows empty input when no saved term exists', () => {
    render(<Search />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'R2-D2');
    render(<Search />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('R2-D2');
  });
});
