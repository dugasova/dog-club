import { useState } from 'react';
const Logo = '/icons/logo.svg';
const BasketImg = '/icons/basket.svg';
const Hamburger = '/icons/hamburger.svg';
import './Header.scss';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/useAuth';
import { useCart } from '@/context/useCart';
import { selectTotalItems } from '@/store/cart/selectors';

import LanguageButton from '../LanguageButton/LanguageButton';
import Menu from '../Menu/Menu';
import MobileMenu from '../MobileMenu/MobileMenu';

interface HeaderProps {
  onContactUsClick: () => void;
}

export default function Header({ onContactUsClick }: HeaderProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logOut } = useAuth();

  const { state } = useCart();

  const navigate = useNavigate();

  const handleBasketClick = () => {
    navigate('/basket');
  };

  const handleLogout = async () => {
    try {
      await navigate('/', { flushSync: true });
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/signup');

  const totalItems = selectTotalItems(state);

  return (
    <div className="header-wrapper">
      <div className="container">
        <header className="header">
          <Link to="/" className="header-container_logo">
            <img className="header-logo" src={Logo} alt="DogClub — home" />
          </Link>

          <Menu />
          {user?.email ? (
            <div className="header-auth">
              <Link to="/account" className="header-auth-button">
                {t('header.account')}
              </Link>
              <button className="header-auth-button" onClick={handleLogout}>
                {t('header.logout')}
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <button onClick={goToLogin} className="header-auth-button">
                {t('header.login')}
              </button>
              <button onClick={goToSignup} className="header-auth-button">
                {t('header.signup')}
              </button>
            </div>
          )}
          <LanguageButton />
          <div className="header-controls">
            <div className="header-basket">
              <button
                className="header-basket"
                aria-label={t('header.basket')}
                onClick={handleBasketClick}
              >
                <img src={BasketImg} alt={t('header.basket')} />
                {totalItems > 0 && <span className="header-basket__count">{totalItems}</span>}
              </button>
              <button className="header-basket__btn" onClick={onContactUsClick}>
                {t('header.contactUs')}
              </button>
            </div>
            <button
              className="header-hamburger"
              aria-label={t('header.openMenu')}
              onClick={() => setMobileOpen(true)}
            >
              <img src={Hamburger} alt="" />
            </button>
          </div>
        </header>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </div>
    </div>
  );
}
