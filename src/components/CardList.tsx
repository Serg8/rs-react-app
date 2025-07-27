import Card from './Card';
import type { Person } from '../types/person.ts';

interface CardListProps {
  results: Person[];
}

function CardList({ results }: CardListProps) {
  return (
    <div className="space-y-4">
      {results.map((person) => (
        <Card key={person.url} {...person} />
      ))}
    </div>
  );
}

export default CardList;
