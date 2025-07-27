import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from '../../components/About';

describe('About component', () => {
  test('Has gitHub link', () => {
    render(<About />);
    expect(screen.getByTestId('test-github-link')).toBeInTheDocument();
  });
});
