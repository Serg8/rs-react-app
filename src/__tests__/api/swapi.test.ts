import { fetchPeople } from '../../api/swapi';

global.fetch = jest.fn();

describe('fetchPeople', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Throws an error if response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchPeople()).rejects.toThrow('HTTP error! status: 500');
  });

  test('Returns data correctly when API call succeeds without search query', async () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          height: '172',
          mass: '77',
          birth_year: '19BBY',
          eye_color: 'blue',
          hair_color: 'blond',
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchPeople();
    expect(fetch).toHaveBeenCalledWith('https://swapi-api.hbtn.io/api/people/');
    expect(data).toEqual(mockData);
  });

  test('Returns data correctly when API call succeeds with search query', async () => {
    const mockData = {
      results: [
        {
          name: 'Leia Organa',
          gender: 'female',
          height: '150',
          mass: '49',
          birth_year: '19BBY',
          eye_color: 'brown',
          hair_color: 'brown',
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const searchTerm = 'Leia Organa';
    const data = await fetchPeople(searchTerm);
    expect(fetch).toHaveBeenCalledWith(
      `https://swapi-api.hbtn.io/api/people/?search=${encodeURIComponent(searchTerm)}`
    );
    expect(data).toEqual(mockData);
  });
});
