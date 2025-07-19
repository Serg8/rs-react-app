import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/CardList.tsx';

const mockResults = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    eye_color: 'blue',
    hair_color: 'blond',
  },
  {
    name: 'Leia Organa',
    gender: 'female',
    height: '150',
    mass: '49',
    birth_year: '19BBY',
    eye_color: 'brown',
    hair_color: 'brown',
  },
];

describe('CardList component', () => {
  test('Renders correct number of items when data is provided', () => {
    render(<CardList results={mockResults} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockResults.length);
  });
  test('Handles empty results array gracefully', () => {
    render(<CardList results={[]} />);
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });
});
