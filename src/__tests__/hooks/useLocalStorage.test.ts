import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns initial value if no value in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value')
    );

    const [value] = result.current;
    expect(value).toBe('default-value');
  });

  test('returns value from localStorage if present', () => {
    localStorage.setItem('test-key', 'stored-value');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value')
    );

    const [value] = result.current;
    expect(value).toBe('stored-value');
  });

  test('updates localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    expect(localStorage.getItem('test-key')).toBe('updated');
  });
});
