import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card component', () => {
  test('Displays item name and description correctly', () => {
    render(
      <Card
        name="Luke Skywalker"
        gender="male"
        height="172"
        mass="77"
        birth_year="19BBY"
        eye_color="blue"
        hair_color="blond"
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Gender: male, Height: 172 cm, Mass: 77 kg, Birth Year: 19BBY, Eye Color: blue, Hair Color: blond/i
      )
    ).toBeInTheDocument();
  });
});
