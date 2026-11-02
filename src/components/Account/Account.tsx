import './Account.scss';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/useAuth';
import { deleteOrder, type Order, type OrderItem, subscribeToOrders } from '@/services/orders';
import { formatPrice } from '@/utils/formatPrice';

export default function Account() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user?.email) return;
    return subscribeToOrders(user.email, setOrders);
  }, [user?.email]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!user?.email) return;
    try {
      await deleteOrder(user.email, orders, orderId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">{t('account.title')}</h1>
      <p className="account-subtitle">{t('account.desc')}</p>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order: Order) => {
            const orderDate = order.createdAt
              ? new Date(order.createdAt.seconds * 1000).toLocaleString()
              : t('account.noDate');
            return (
              <div key={order.orderId} className="order-card">
                <h3 className="order-card__title">
                  {t('account.orderFrom')}: {order.email}
                </h3>
                <p className="order-card__info">
                  <strong>{t('account.date')}:</strong> {orderDate}
                </p>
                <p className="order-card__info">
                  <strong>{t('account.totalPrice')}:</strong> {formatPrice(order.totalPrice || 0)}
                </p>
                <p className="order-card__info">
                  <strong>{t('account.totalItems')}:</strong> {order.totalItems || 0}
                </p>
                <h4>{t('account.items')}:</h4>
                <ul className="order-card__items">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: OrderItem, itemIndex: number) => (
                      <li key={itemIndex} className="order-card__item-detail">
                        <p>
                          {item.desc} (x{item.quantity}) - {formatPrice(item.price || 0)}{' '}
                          {t('account.each')}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li key={order.orderId}>{t('account.noItems')}</li>
                  )}
                </ul>
                <button
                  className="order-card__delete-button"
                  onClick={() => handleDeleteOrder(order.orderId)}
                >
                  {t('account.button')}
                </button>
                <hr className="order-card__divider" />
              </div>
            );
          })
        ) : (
          <p className="no-orders">{t('account.noOrders')}</p>
        )}
      </div>
    </div>
  );
}
