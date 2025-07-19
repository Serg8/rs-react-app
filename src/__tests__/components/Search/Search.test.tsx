import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../../components/Search/Search';
import ErrorBoundary from '../../../components/ErrorBoundary';

describe('Search component', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
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
});
