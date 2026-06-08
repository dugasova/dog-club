import { useEffect, useState } from 'react';
import './Account.scss';
import { UserAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { deleteOrder, subscribeToOrders, type Order, type OrderItem } from '../../services/orders';

export default function Account() {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = UserAuth();
  const { t } = useTranslation()

  useEffect(() => {
    if (!user?.email) return;
    return subscribeToOrders(user.email, setOrders);
  }, [user?.email])

  const handleDeleteOrder = async (passedOrder: Order) => {
    if (!user?.email) return;
    try {
      await deleteOrder(user.email, orders, passedOrder);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">{t('account.title')}</h1>
      <p className="account-subtitle">{t('account.desc')}</p>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order: Order) => {
            const orderDate = order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : 'N/A';
            return (
              <div key={order.id} className="order-card">
                <h3 className="order-card__title">{t("account.orderFrom")}: {order.id}</h3>
                <p className="order-card__info"><strong>{t("account.date")}:</strong> {orderDate}</p>
                <p className="order-card__info"><strong>{t("account.totalPrice")}:</strong> ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</p>
                <p className="order-card__info"><strong>{t("account.totalItems")}:</strong> {order.totalItems || 0}</p>
                <h4>{t("account.items")}:</h4>
                <ul className="order-card__items">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: OrderItem, itemIndex: number) => (
                      <li key={itemIndex} className="order-card__item-detail">
                        <p>{item.desc} (x{item.quantity}) - ${item.price ? item.price.toFixed(2) : '0.00'} each</p>
                      </li>
                    ))
                  ) : (
                    <li key={order.id} >No items found for this order.</li>
                  )}
                </ul>
                <button
                  className="order-card__delete-button"
                  onClick={() => handleDeleteOrder(order)}
                >
                  {t("account.button")}
                </button>
                <hr className="order-card__divider" />
              </div>
            );
          })
        ) : (
          <p className="no-orders">{t("account.noOrders")}</p>
        )}
      </div>
    </div>
  )
}
