import { describe, expect, it } from 'vitest';

import type { CartItem } from '@/types';

import { selectTotalItems, selectTotalPrice } from './selectors';

const item = (price: number, quantity: number): CartItem => ({
  id: price,
  name: 'Kibble',
  price,
  imgSrc: '',
  code: 'K1',
  rating: 4,
  desc: 'Good kibble',
  quantity,
});

describe('cart selectors', () => {
  it('counts all units in the cart', () => {
    expect(selectTotalItems({ items: [item(10, 2), item(5, 3)] })).toBe(5);
  });

  it('sums the price of all units', () => {
    expect(selectTotalPrice({ items: [item(10, 2), item(5, 3)] })).toBe(35);
  });

  it('returns zero for an empty cart', () => {
    const empty = { items: [] };

    expect(selectTotalItems(empty)).toBe(0);
    expect(selectTotalPrice(empty)).toBe(0);
  });
});
