import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Basket from './Basket';
import type { CartItem } from '../../types';

const dispatch = vi.fn();
const navigate = vi.fn();
let cartItems: CartItem[] = [];
let authUser: { email: string; uid: string } | null = null;

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  name: 'Chicken kibble',
  price: 10,
  imsrcOfImg: 'kibble.png',
  code: 'KBL-1',
  raiting: 4,
  desc: 'Tasty chicken kibble',
  quantity: 1,
  ...overrides,
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

vi.mock('../../context/useCart', () => ({
  useCart: () => ({ state: { items: cartItems }, dispatch }),
}));

vi.mock('../../context/AuthContext', () => ({
  UserAuth: () => ({ user: authUser }),
}));

vi.mock('firebase/firestore', () => ({
  arrayUnion: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
}));

vi.mock('../../firebase', () => ({
  db: {},
}));

describe('Basket', () => {
  beforeEach(() => {
    dispatch.mockClear();
    navigate.mockClear();
    cartItems = [];
    authUser = null;
  });

  it('shows the empty basket view when there are no items', () => {
    const { container } = render(<Basket />);

    expect(screen.getByRole('heading', { name: 'empty.title' })).toBeInTheDocument();
    expect(container.querySelector('.basket-items-list')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'basket.checkout' })).not.toBeInTheDocument();
  });

  it('renders cart items with their details and the total price', () => {
    cartItems = [item({ id: 1, quantity: 2, price: 10 }), item({ id: 2, name: 'Beef chunks', price: 5, quantity: 1 })];
    render(<Basket />);

    expect(screen.getByText('Chicken kibble')).toBeInTheDocument();
    expect(screen.getByText('Beef chunks')).toBeInTheDocument();
    expect(screen.getByText('basket.totalPrice: $25.00')).toBeInTheDocument();
  });

  it('increments the quantity when the plus button is clicked', async () => {
    cartItems = [item({ id: 1, quantity: 2 })];
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: '+' }));

    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_QUANTITY', id: 1, quantity: 3 });
  });

  it('decrements the quantity when the minus button is clicked', async () => {
    cartItems = [item({ id: 1, quantity: 2 })];
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: '-' }));

    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_QUANTITY', id: 1, quantity: 1 });
  });

  it('removes the item instead of going below quantity 1', async () => {
    cartItems = [item({ id: 1, quantity: 1 })];
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: '-' }));

    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', id: 1 });
  });

  it('removes an individual item via the remove button', async () => {
    cartItems = [item({ id: 1 })];
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: 'basket.remove' }));

    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', id: 1 });
  });

  it('clears the cart via the clear cart button', async () => {
    cartItems = [item({ id: 1 }), item({ id: 2 })];
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: 'basket.clearCart' }));

    expect(dispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
  });

  it('shows a login redirect message when checking out while logged out', async () => {
    cartItems = [item({ id: 1 })];
    authUser = null;
    const user = userEvent.setup();
    render(<Basket />);

    await user.click(screen.getByRole('button', { name: 'basket.checkout' }));

    expect(await screen.findByText('basket.modalRedirect')).toBeInTheDocument();
  });
});
