import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { CartContext, useCart } from './useCart';
import { cartState } from '../store/cart/reducer';

describe('useCart', () => {
  it('throws when used outside of a CartProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within a CartProvider');

    consoleError.mockRestore();
  });

  it('returns the context value when used within a CartProvider', () => {
    const dispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContext.Provider value={{ state: cartState, dispatch }}>{children}</CartContext.Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state).toBe(cartState);
    expect(result.current.dispatch).toBe(dispatch);
  });
});
