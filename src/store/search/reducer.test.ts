import { describe, it, expect } from 'vitest';
import { reducer, initialState, type NutriCard, type SearchState } from './reducer';
import { SEARCH_SET, LIST_SEARCH_SET, LIST_SEARCH } from './action';

const card = (overrides: Partial<NutriCard> = {}): NutriCard => ({
  id: 1,
  raiting: 4.5,
  price: 10,
  code: 'KBL-1',
  desc: 'Chicken kibble for dogs',
  imsrcOfImg: 'kibble.png',
  ...overrides,
});

describe('search reducer', () => {
  it('returns the initial state for an unknown action', () => {
    const state = reducer(initialState, { type: 'UNKNOWN_ACTION', payload: undefined });

    expect(state).toBe(initialState);
  });

  it('sets the search term', () => {
    const state = reducer(initialState, { type: SEARCH_SET, payload: 'kibble' });

    expect(state.search).toBe('kibble');
  });

  it('sets the search list directly', () => {
    const list = [card({ id: 1 }), card({ id: 2 })];

    const state = reducer(initialState, { type: LIST_SEARCH_SET, payload: list });

    expect(state.searchList).toEqual(list);
  });

  it('filters the search list by description, case-insensitively', () => {
    const list = [
      card({ id: 1, desc: 'Chicken kibble for dogs' }),
      card({ id: 2, desc: 'Beef stew for cats' }),
      card({ id: 3, desc: 'Salmon KIBBLE for puppies' }),
    ];
    const initial: SearchState = { search: 'kibble', searchList: [] };

    const state = reducer(initial, { type: LIST_SEARCH, payload: { list, value: 'kibble' } });

    expect(state.searchList).toEqual([list[0], list[2]]);
  });
});
