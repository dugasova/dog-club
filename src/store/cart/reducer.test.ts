import { describe, it, expect } from 'vitest';
import { cartReducer, cartState, type CartState } from './reducer';
import { CartActionType } from './actions';
import type { CartItem } from '../../types';

const item = (overrides: Partial<Omit<CartItem, 'quantity'>> = {}): Omit<CartItem, 'quantity'> => ({
  id: 1,
  name: 'Chicken kibble',
  price: 10,
  imsrcOfImg: 'kibble.png',
  code: 'KBL-1',
  raiting: 4.5,
  desc: 'Tasty chicken kibble for dogs',
  ...overrides,
});

describe('cartReducer', () => {
  it('adds a new item to an empty cart with quantity 1', () => {
    const state = cartReducer(cartState, { type: CartActionType.ADD_ITEM, item: item() });

    expect(state.items).toEqual([{ ...item(), quantity: 1 }]);
  });

  it('increments the quantity when adding an item that is already in the cart', () => {
    const initial: CartState = { items: [{ ...item(), quantity: 1 }] };

    const state = cartReducer(initial, { type: CartActionType.ADD_ITEM, item: item() });

    expect(state.items).toEqual([{ ...item(), quantity: 2 }]);
  });

  it('removes an item by id', () => {
    const initial: CartState = {
      items: [
        { ...item({ id: 1 }), quantity: 1 },
        { ...item({ id: 2 }), quantity: 3 },
      ],
    };

    const state = cartReducer(initial, { type: CartActionType.REMOVE_ITEM, id: 1 });

    expect(state.items).toEqual([{ ...item({ id: 2 }), quantity: 3 }]);
  });

  it('updates the quantity of an existing item', () => {
    const initial: CartState = { items: [{ ...item(), quantity: 1 }] };

    const state = cartReducer(initial, { type: CartActionType.UPDATE_QUANTITY, id: 1, quantity: 5 });

    expect(state.items).toEqual([{ ...item(), quantity: 5 }]);
  });

  it('clears all items from the cart', () => {
    const initial: CartState = {
      items: [
        { ...item({ id: 1 }), quantity: 1 },
        { ...item({ id: 2 }), quantity: 2 },
      ],
    };

    const state = cartReducer(initial, { type: CartActionType.CLEAR_CART });

    expect(state.items).toEqual([]);
  });

  it('returns the same state for an unknown action', () => {
    const initial: CartState = { items: [{ ...item(), quantity: 1 }] };

    // @ts-expect-error - intentionally passing an action type the reducer doesn't handle
    const state = cartReducer(initial, { type: 'UNKNOWN_ACTION' });

    expect(state).toBe(initial);
  });
});
