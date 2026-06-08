import { arrayUnion, doc, onSnapshot, updateDoc, type Unsubscribe } from 'firebase/firestore';
import { db } from '../firebase';
import type { CartItem } from '../types';

export interface OrderItem {
  desc: string;
  quantity: number;
  price: number;
  id?: number;
  imsrcOfImg?: string;
  code?: string;
  raiting?: number;
}

export interface Order {
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  email: string;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  userId: string;
}

export interface NewOrder {
  email: string;
  userId: string;
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: Date;
}

export const placeOrder = (order: NewOrder) =>
  updateDoc(doc(db, 'users', order.email), { savedFood: arrayUnion(order) });

export const subscribeToOrders = (email: string, onChange: (orders: Order[]) => void): Unsubscribe =>
  onSnapshot(doc(db, 'users', email), (snapshot) => {
    onChange(snapshot.data()?.savedFood || []);
  });

export const deleteOrder = (email: string, orders: Order[], orderToDelete: Order) => {
  const remainingOrders = orders.filter(order => order.createdAt.seconds !== orderToDelete.createdAt.seconds);
  return updateDoc(doc(db, 'users', email), { savedFood: remainingOrders });
};
