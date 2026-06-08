import { useState, useMemo, useCallback, useEffect } from "react";
import "./Basket.scss";
import { useCart } from "../../context/useCart";
import HomeIcon from "../../assets/icons/servicearrow.svg";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { placeOrder } from "../../services/orders";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
import EmptyBasket from "./EmptyBasket";
import type { CartItem } from "../../types";

export default function Basket() {
  const { user } = UserAuth();
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleGoToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleGoToParches = useCallback(() => {
    navigate('/happy-customer');
  }, [navigate]);

  const handleRemoveItem = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    }
  }, [dispatch, handleRemoveItem]);

  const handleRemoveAllItems = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const totalPrice = useMemo(() =>
    state.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const totalItems = useMemo(() =>
    state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [state.items]
  );

  const showModal = useCallback((message: string) => {
    setModalMessage(message);
  }, []);

  useEffect(() => {
    if (modalMessage) {
      const timer = setTimeout(() => {
        setModalMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalMessage]);

  const sendOrderToFirebase = useCallback(async () => {
    if (state.items.length === 0) {
      showModal('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!user) {
      showModal(`${t("basket.modalRedirect")}`);
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    try {
      await placeOrder({
        email: `${user.email}`,
        userId: user.uid,
        orderId: user.uid,
        items: state.items,
        totalPrice,
        totalItems,
        createdAt: new Date(),
      });

      dispatch({ type: 'CLEAR_CART' });
      showModal(`${t("basket.modalSuccess")}`);
      setTimeout(() => navigate('/account'), 3000);
    } catch (e) {
      console.error('Error adding document: ', e);
      showModal('Error placing order. Please try again.');
    }
  }, [user, state.items, totalPrice, totalItems, t, navigate, dispatch, showModal]);

  const handleCheckout = useCallback(() => {
    sendOrderToFirebase();
  }, [sendOrderToFirebase]);

  return (
    <div className="basket">
      <div className="basket-container">
        <div className="basket-content">
          {modalMessage && (
            <Modal handleClick={() => setModalMessage(null)}>
              <p>{modalMessage}</p>
            </Modal>
          )}
          {state.items.length === 0 ? (
            <EmptyBasket />
          ) : (
            <ul className="basket-items-list">
              {state.items.map((item: CartItem) => (
                <li key={item.id} className="basket-item">
                  <img src={item.imsrcOfImg} alt={item.name} className="basket-item-image" />
                  <div className="basket-item-details">
                    <p className="basket-item-name">{item.name}</p>
                    <p>{item.desc}</p>
                    <p>{item.code}</p>
                    <p>{item.rating}/5</p>
                    <p className="basket-item-price">${item.price}.00</p>
                    <div className='basket-item-quantity-control'>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className='remove-item-button'>{t("basket.remove")}</button>
                </li>
              ))}
              <button className='remove-item-button btn-remove' onClick={handleRemoveAllItems}>{t("basket.clearCart")}</button>
            </ul>
          )}

          {state.items.length > 0 && (
            <div className='cart-footer'>
              <h3 className='cart-footer__price'>{t("basket.totalPrice")}: ${totalPrice.toFixed(2)}</h3>

              <div className="cart-footer__navigate">
                <button className="cart-footer__navigate-btn btn-home"
                  onClick={handleGoToHome}>
                  <img src={HomeIcon} alt="" />
                  {t("basket.goToHome")}
                </button>
                <button
                  onClick={handleGoToParches}
                  className="cart-footer__navigate-btn btn-purchases">
                  <img src={HomeIcon} alt="" />
                  {t("basket.goToPurchases")}
                </button>
                <button className='checkout-btn' onClick={handleCheckout}> {t("basket.checkout")}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}