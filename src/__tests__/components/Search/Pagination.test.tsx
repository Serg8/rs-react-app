import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../../../components/Search/Pagination';

describe('Pagination component', () => {
  const setup = (
    currentPage: number,
    totalCount: number,
    onPageChange = jest.fn()
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };

  test('Renders page numbers correctly', () => {
    setup(1, 30);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('Does not render if only one page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalCount={8} onPageChange={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('Disables Prev on first page', () => {
    setup(1, 30);
    expect(screen.getByTestId('test-prev')).toBeDisabled();
  });

  test('Disables Next on last page', () => {
    setup(3, 30);
    expect(screen.getByTestId('test-next')).toBeDisabled();
  });

  test('Calls onPageChange with next page on Next click', async () => {
    const { onPageChange } = setup(2, 30);
    await userEvent.click(screen.getByTestId('test-next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
