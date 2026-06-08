import { useEffect, useState } from 'react';
import './Account.scss';
import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

interface OrderItem {
  desc: string;
  quantity: number;
  price: number;
  id?: number;
  imsrcOfImg?: string;
  code?: string;
  raiting?: number;
}

interface Order {
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  email: string;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  userId: string;
}

export default function Account() {
  const [orders, setOrders] = useState([])
  const { user } = UserAuth();
  const { t } = useTranslation()

  useEffect(() => {
    if (!user) return;
    onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      setOrders(doc.data()?.savedFood || [])
      console.log(doc.data()?.savedFood)
    })
  }, [user?.email])

  const deleteOrder = async (passedOrder: Order) => {
    try {
      const result = orders.filter((item: Order) => item.createdAt.seconds !== passedOrder.createdAt.seconds);
      await updateDoc(doc(db, 'users', `${user?.email}`), {
        savedFood: result,
      });
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
                  onClick={() => deleteOrder(order)}
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
