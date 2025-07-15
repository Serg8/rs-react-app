import { Component } from 'react';

interface CardProps {
  name: string;
  gender: string;
  height: string;
  mass: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, gender, height, mass, birth_year, eye_color, hair_color } =
      this.props;

    return (
      <section className="p-4 border border-gray-200 rounded-md shadow-sm flex gap-2 flex-col md:flex-row">
        <h3 className="font-semibold text-lg w-full md:w-1/3 shrink-0">
          {name}
        </h3>
        <p className="text-gray-700 text-sm">
          Gender: {gender}, Height: {height} cm, Mass: {mass} kg, Birth Year:{' '}
          {birth_year}, Eye Color: {eye_color}, Hair Color: {hair_color}
        </p>
      </section>
    );
  }
}

export default Card;
