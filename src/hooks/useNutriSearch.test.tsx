import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useNutriSearch from './useNutriSearch';
import { actionCreator } from '../store/store';
import { SEARCH_SET } from '../store/search/action';
import type { CardData } from '../types';

const card = (overrides: Partial<CardData> = {}): CardData => ({
  id: 1,
  rating: 4.5,
  price: 10,
  code: 'KBL-1',
  desc: 'Chicken kibble for dogs',
  imsrcOfImg: 'kibble.png',
  ...overrides,
});

describe('useNutriSearch', () => {
  it('initializes the search list with the full list', () => {
    const list = [card({ id: 1 }), card({ id: 2 })];

    const { result } = renderHook(() => useNutriSearch(list));

    expect(result.current.stateSearch.search).toBe('');
    expect(result.current.stateSearch.searchList).toEqual(list);
  });

  it('filters the search list once the search term reaches 3 characters', () => {
    const list = [
      card({ id: 1, desc: 'Chicken kibble for dogs' }),
      card({ id: 2, desc: 'Beef stew for cats' }),
    ];

    const { result } = renderHook(() => useNutriSearch(list));

    act(() => {
      result.current.dispatchSearch(actionCreator(SEARCH_SET, 'kib'));
    });

    expect(result.current.stateSearch.search).toBe('kib');
    expect(result.current.stateSearch.searchList).toEqual([list[0]]);
  });

  it('resets the search list to the full list once the search term drops below 3 characters', () => {
    const list = [
      card({ id: 1, desc: 'Chicken kibble for dogs' }),
      card({ id: 2, desc: 'Beef stew for cats' }),
    ];

    const { result } = renderHook(() => useNutriSearch(list));

    act(() => {
      result.current.dispatchSearch(actionCreator(SEARCH_SET, 'kib'));
    });
    expect(result.current.stateSearch.searchList).toEqual([list[0]]);

    act(() => {
      result.current.dispatchSearch(actionCreator(SEARCH_SET, 'ki'));
    });

    expect(result.current.stateSearch.searchList).toEqual(list);
  });
});
