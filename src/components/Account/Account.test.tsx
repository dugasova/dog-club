import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Account from './Account';
import type { Order } from '../../services/orders';

const { subscribeToOrders, deleteOrder } = vi.hoisted(() => ({
  subscribeToOrders: vi.fn(),
  deleteOrder: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../context/AuthContext', () => ({
  UserAuth: () => ({ user: authUser }),
}));

vi.mock('../../services/orders', () => ({ subscribeToOrders, deleteOrder }));

let authUser: { email: string; uid: string } | null = null;
const mockUnsubscribe = vi.fn();

const order = (overrides: Partial<Order> = {}): Order => ({
  id: 'order-1',
  createdAt: { seconds: 1700000000, nanoseconds: 0 },
  email: 'user@example.com',
  items: [{ desc: 'Chicken kibble', quantity: 2, price: 10 }],
  totalPrice: 20,
  totalItems: 2,
  userId: 'user-1',
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  authUser = null;
  subscribeToOrders.mockReturnValue(mockUnsubscribe);
  deleteOrder.mockResolvedValue(undefined);
});

describe('Account', () => {
  it('renders the page title and a no-orders message when there are no orders', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([]);
      return mockUnsubscribe;
    });

    render(<Account />);

    expect(screen.getByRole('heading', { name: 'account.title' })).toBeInTheDocument();
    expect(screen.getByText('account.noOrders')).toBeInTheDocument();
  });

  it('does not subscribe when the user has no email', () => {
    authUser = null;

    render(<Account />);

    expect(subscribeToOrders).not.toHaveBeenCalled();
  });

  it('subscribes using the user email on mount', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };

    render(<Account />);

    expect(subscribeToOrders).toHaveBeenCalledWith('user@example.com', expect.any(Function));
  });

  it('renders an order card when orders arrive from the subscription', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([order()]);
      return mockUnsubscribe;
    });

    render(<Account />);

    expect(screen.getByText('account.orderFrom: order-1')).toBeInTheDocument();
    expect(screen.getByText(/\$20\.00/)).toBeInTheDocument();
    expect(screen.getByText(/account\.totalItems/)).toBeInTheDocument();
  });

  it('renders item details within an order', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([order()]);
      return mockUnsubscribe;
    });

    render(<Account />);

    expect(screen.getByText('Chicken kibble (x2) - $10.00 each')).toBeInTheDocument();
  });

  it('shows "No items found" when an order has an empty items list', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([order({ items: [] })]);
      return mockUnsubscribe;
    });

    render(<Account />);

    expect(screen.getByText('No items found for this order.')).toBeInTheDocument();
  });

  it('calls deleteOrder with the correct arguments when the delete button is clicked', async () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    const testOrder = order();
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([testOrder]);
      return mockUnsubscribe;
    });
    const user = userEvent.setup();
    render(<Account />);

    await user.click(screen.getByRole('button', { name: 'account.button' }));

    expect(deleteOrder).toHaveBeenCalledWith('user@example.com', [testOrder], testOrder);
  });

  it('unsubscribes from orders when the component unmounts', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };

    const { unmount } = render(<Account />);
    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('renders multiple order cards when multiple orders arrive', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      cb([order({ id: 'order-1' }), order({ id: 'order-2' })]);
      return mockUnsubscribe;
    });

    render(<Account />);

    expect(screen.getByText('account.orderFrom: order-1')).toBeInTheDocument();
    expect(screen.getByText('account.orderFrom: order-2')).toBeInTheDocument();
  });

  it('updates the order list when the subscription delivers new data', () => {
    authUser = { email: 'user@example.com', uid: 'user-1' };
    let capturedCallback: (o: Order[]) => void;
    subscribeToOrders.mockImplementation((_email: string, cb: (o: Order[]) => void) => {
      capturedCallback = cb;
      return mockUnsubscribe;
    });

    render(<Account />);
    expect(screen.getByText('account.noOrders')).toBeInTheDocument();

    act(() => capturedCallback([order()]));

    expect(screen.queryByText('account.noOrders')).not.toBeInTheDocument();
    expect(screen.getByText('account.orderFrom: order-1')).toBeInTheDocument();
  });
});
