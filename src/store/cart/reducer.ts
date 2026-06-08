import { CartActionType } from './actions';
import type { CartItem } from '../../types';

export type CartState = {
  items: CartItem[];
};
const cartState: CartState = {
    items: []
}

export type CartAction =
  | { type: typeof CartActionType.ADD_ITEM; item: Omit<CartItem, 'quantity'> }
  | { type: typeof CartActionType.REMOVE_ITEM; id: number }
  | { type: typeof CartActionType.UPDATE_QUANTITY; id: number; quantity: number }
  | { type: typeof CartActionType.CLEAR_CART };


const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.item, quantity: 1 }],
        };
      }
    }
    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    case CartActionType.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        )
      };
    case CartActionType.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    default:
      return state;

  }
};

export {cartReducer, cartState}