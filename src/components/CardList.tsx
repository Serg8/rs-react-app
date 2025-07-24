import type { FC } from 'react';
import Card from './Card';
import type { Person } from '../types/person.ts';

interface CardListProps {
  results: Person[];
}

const CardList: FC<CardListProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((person) => (
        <Card key={person.name} {...person} />
      ))}
    </div>
  );
};

export default CardList;
