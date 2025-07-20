import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from '../App';

test('Render the App', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByTestId('app')).toBeInTheDocument();
});
