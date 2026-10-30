import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { NewOrder, Order } from './orders';
import { deleteOrder, placeOrder, subscribeToOrders } from './orders';

const { mockDoc, mockOnSnapshot, mockUpdateDoc, mockSetDoc, mockArrayUnion, mockUnsubscribe } =
  vi.hoisted(() => ({
    mockDoc: vi.fn(),
    mockOnSnapshot: vi.fn(),
    mockUpdateDoc: vi.fn(),
    mockArrayUnion: vi.fn(),
    mockUnsubscribe: vi.fn(),
    mockSetDoc: vi.fn(),
  }));

vi.mock('firebase/firestore', () => ({
  doc: mockDoc,
  onSnapshot: mockOnSnapshot,
  updateDoc: mockUpdateDoc,
  arrayUnion: mockArrayUnion,
  setDoc: mockSetDoc,
}));

vi.mock('../firebase', () => ({ db: {} }));

const docRef = { id: 'mock-doc-ref' };

const order = (overrides: Partial<Order> = {}): Order => ({
  orderId: 'order-1',
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
  mockOnSnapshot.mockImplementation(() => mockUnsubscribe);
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

  it('saves the order using arrayUnion and merge so the document is created if missing', async () => {
    await placeOrder(newOrder);

    expect(mockArrayUnion).toHaveBeenCalledWith(newOrder);
    expect(mockSetDoc).toHaveBeenCalledWith(
      docRef,
      { savedFood: { __arrayUnion: newOrder } },
      { merge: true },
    );
  });

  it('returns the promise from setDoc', () => {
    const result = placeOrder(newOrder);

    expect(result).toBe(mockSetDoc.mock.results[0].value);
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
    const orders = [order({ orderId: 'order-1' }), order({ orderId: 'order-2' })];
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
    await deleteOrder('user@example.com', [order()], order().orderId);

    expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'user@example.com');
  });

  it('removes only the target order when two orders share the same timestamp', async () => {
    const sameTime = { seconds: 100, nanoseconds: 0 };
    const keep = order({ orderId: 'keep', createdAt: sameTime });
    const remove = order({ orderId: 'remove', createdAt: sameTime });

    await deleteOrder('user@example.com', [keep, remove], remove.orderId);

    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, { savedFood: [keep] });
  });

  it('removes the target order and saves the remainder', async () => {
    const keep = order({ orderId: 'keep', createdAt: { seconds: 200, nanoseconds: 0 } });
    const remove = order({ orderId: 'remove', createdAt: { seconds: 100, nanoseconds: 0 } });

    await deleteOrder('user@example.com', [keep, remove], remove.orderId);

    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, { savedFood: [keep] });
  });

  it('saves an empty array when deleting the only order', async () => {
    const only = order();

    await deleteOrder('user@example.com', [only], only.orderId);

    expect(mockUpdateDoc).toHaveBeenCalledWith(docRef, { savedFood: [] });
  });

  it('returns the promise from updateDoc', () => {
    const result = deleteOrder('user@example.com', [order()], order().orderId);

    expect(result).toBe(mockUpdateDoc.mock.results[0].value);
  });
});
