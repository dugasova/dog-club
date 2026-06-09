import { describe, it, expect, vi, beforeEach } from 'vitest';
import { placeOrder, subscribeToOrders, deleteOrder } from './orders';
import type { Order, NewOrder } from './orders';

const { mockDoc, mockOnSnapshot, mockUpdateDoc, mockArrayUnion, mockUnsubscribe } = vi.hoisted(() => ({
  mockDoc: vi.fn(),
  mockOnSnapshot: vi.fn(),
  mockUpdateDoc: vi.fn(),
  mockArrayUnion: vi.fn(),
  mockUnsubscribe: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: mockDoc,
  onSnapshot: mockOnSnapshot,
  updateDoc: mockUpdateDoc,
  arrayUnion: mockArrayUnion,
}));

vi.mock('../firebase', () => ({ db: {} }));

const docRef = { id: 'mock-doc-ref' };

const order = (overrides: Partial<Order> = {}): Order => ({
  id: 'order-1',
  createdAt: { seconds: 1000, nanoseconds: 0 },
  email: 'user@example.com',
  items: [],
  totalPrice: 20,
  totalItems: 2,
  userId: 'user-1',
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockDoc.mockReturnValue(docRef);
  mockUpdateDoc.mockResolvedValue(undefined);
  mockArrayUnion.mockImplementation((data: unknown) => ({ __arrayUnion: data }));
  mockOnSnapshot.mockImplementation((_ref: unknown, cb: (s: unknown) => void) => {
    return mockUnsubscribe;
  });
});

describe('placeOrder', () => {
  const newOrder: NewOrder = {
    email: 'user@example.com',
    userId: 'user-1',
    orderId: 'user-1',
    items: [],
    totalPrice: 30,
    totalItems: 3,
    createdAt: new Date('2024-01-01'),
  };

  it('writes to the correct Firestore document path', async () => {
    await placeOrder(newOrder);

    expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'user@example.com');
  });

  it('saves the order using arrayUnion so existing orders are preserved', async () => {
    await placeOrder(newOrder);

    expect(mockArrayUnion).toHaveBeenCalledWith(newOrder);
    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, {
      savedFood: { __arrayUnion: newOrder },
    });
  });

  it('returns the promise from updateDoc', () => {
    const result = placeOrder(newOrder);

    expect(result).toBe(mockUpdateDoc.mock.results[0].value);
  });
});

describe('subscribeToOrders', () => {
  it('subscribes to the correct Firestore document path', () => {
    subscribeToOrders('user@example.com', vi.fn());

    expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'user@example.com');
    expect(mockOnSnapshot).toHaveBeenCalledWith(docRef, expect.any(Function));
  });

  it('calls onChange with savedFood orders when the snapshot contains data', () => {
    const onChange = vi.fn();
    const orders = [order({ id: 'order-1' }), order({ id: 'order-2' })];
    subscribeToOrders('user@example.com', onChange);

    const snapshotCb = mockOnSnapshot.mock.calls[0][1] as (s: unknown) => void;
    snapshotCb({ data: () => ({ savedFood: orders }) });

    expect(onChange).toHaveBeenCalledWith(orders);
  });

  it('calls onChange with an empty array when savedFood is missing', () => {
    const onChange = vi.fn();
    subscribeToOrders('user@example.com', onChange);

    const snapshotCb = mockOnSnapshot.mock.calls[0][1] as (s: unknown) => void;
    snapshotCb({ data: () => ({}) });

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('returns the unsubscribe function from onSnapshot', () => {
    const unsubscribe = subscribeToOrders('user@example.com', vi.fn());

    expect(unsubscribe).toBe(mockUnsubscribe);
  });
});

describe('deleteOrder', () => {
  it('writes to the correct Firestore document path', async () => {
    await deleteOrder('user@example.com', [order()], order());

    expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'user@example.com');
  });

  it('removes the target order and saves the remainder', async () => {
    const keep = order({ id: 'keep', createdAt: { seconds: 200, nanoseconds: 0 } });
    const remove = order({ id: 'remove', createdAt: { seconds: 100, nanoseconds: 0 } });

    await deleteOrder('user@example.com', [keep, remove], remove);

    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, { savedFood: [keep] });
  });

  it('saves an empty array when deleting the only order', async () => {
    const only = order();

    await deleteOrder('user@example.com', [only], only);

    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, { savedFood: [] });
  });

  it('returns the promise from updateDoc', () => {
    const result = deleteOrder('user@example.com', [order()], order());

    expect(result).toBe(mockUpdateDoc.mock.results[0].value);
  });
});
