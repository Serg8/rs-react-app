import { Component } from 'react';
import Card from './Card';
import type { Person } from '../types/person.ts';

interface CardListProps {
  results: Person[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="space-y-4">
        {results.map((person) => (
          <Card key={person.name} {...person} />
        ))}
      </div>
    );
  }
}

export default CardList;
