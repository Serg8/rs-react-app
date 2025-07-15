import type { Person } from '../types/person';

interface SwapiResponse {
  results: Person[];
}

const API_BASE = 'https://swapi-api.hbtn.io/api/people/';

export const fetchPeople = async (
  searchQuery: string = ''
): Promise<SwapiResponse> => {
  const url = searchQuery
    ? `${API_BASE}?search=${encodeURIComponent(searchQuery)}`
    : API_BASE;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};
