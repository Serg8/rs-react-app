interface CardProps {
  name?: string;
  gender?: string;
  height?: string;
  mass?: string;
  birth_year?: string;
  eye_color?: string;
  hair_color?: string;
}

function Card({
  name,
  gender,
  height,
  mass,
  birth_year,
  eye_color,
  hair_color,
}: CardProps) {
  if (!name) return null;
  return (
    <section
      data-testid="card"
      className="p-4 border border-gray-200 rounded-md shadow-sm flex gap-2 flex-col md:flex-row"
    >
      <h3 className="font-semibold text-lg w-full md:w-1/3 shrink-0">{name}</h3>
      <p className="text-gray-700 text-sm">
        {gender && `Gender: ${gender}, `}
        {height && `Height: ${height} cm, `}
        {mass && `Mass: ${mass} kg, `}
        {birth_year && `Birth Year: ${birth_year}, `}
        {eye_color && `Eye Color: ${eye_color}, `}
        {hair_color && `Hair Color: ${hair_color}`}
      </p>
    </section>
  );
}

export default Card;
