import type { Person } from '../types/person';

interface SwapiResponse {
  results: Person[];
  count: number;
}

const API_BASE = 'https://swapi-api.hbtn.io/api/people/';

export const fetchPeople = async (
  searchQuery: string = '',
  page: number = 1
): Promise<SwapiResponse> => {
  const params = new URLSearchParams();
  if (searchQuery) {
    params.set('search', searchQuery);
  }
  params.set('page', page.toString());
  const url = `${API_BASE}?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};
