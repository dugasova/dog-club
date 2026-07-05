import { useReducer, type ReactNode } from 'react';
import { cartReducer } from '../store/cart/reducer';
import { CartContext } from './useCart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
