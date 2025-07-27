import type { Person } from '../types/person';

interface SwapiResponse {
  results: Person[];
  count: number;
}

const API_BASE = 'https://swapi-api.hbtn.io/api/people/';

export const fetchPeople = async (
  searchQuery: string = '',
  page?: number
): Promise<SwapiResponse> => {
  const params = new URLSearchParams();
  if (searchQuery) {
    params.set('search', searchQuery);
  }
  if (page && page !== 1) {
    params.set('page', page.toString());
  }

  const url = params.toString() ? `${API_BASE}?${params.toString()}` : API_BASE;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};
