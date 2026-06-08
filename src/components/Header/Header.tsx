import { useState } from "react";
import Logo from "../../assets/icons/logo.svg";
import BasketImg from "../../assets/icons/basket.svg";
import Humburger from "../../assets/icons/humburger.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.scss";
import Menu from "../Menu/Menu";
import { useCart } from "../../context/useCart";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from '../../types';
import { UserAuth } from "../../context/AuthContext";
import LanguegeButton from "../LunguageButton/LanguegeButton";

interface HeaderProps {
  onContactUsClick: () => void;
}

export default function Header({ onContactUsClick }: HeaderProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logOut } = UserAuth()

  const { state } = useCart();

  const navigate = useNavigate();

  const handleBasketClick = () => {
    navigate('/basket');
  };

  const handleHome = () => {
    navigate('/')
  }
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }
  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/signup');

  // Fix TypeScript errors by explicitly typing 'item' as CartItem
  const totalItems = state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <div className="container">
      <header className="header">
        <div onClick={handleHome} className="header-container_logo">
          <img className="header-logo" src={Logo} alt="logo of DogClub" />
        </div>
        <Menu />
        {user?.email ? (
          <div className="header-auth">
            <Link to="/account">
              <button className='header-auth-button'>{t('header.account')}</button>
            </Link>
            <button className='header-auth-button' onClick={handleLogout}>{t('header.logout')}</button>
          </div>
        ) : (
          <div className="header-auth">
            {/* use nav-menu-link so buttons get the same appearance as menu links */}
            <button onClick={goToLogin} className='header-auth-button'>{t('header.login')}</button>
            <button onClick={goToSignup} className='header-auth-button'>{t('header.signup')}</button>
          </div>)}
        <LanguegeButton />
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
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <img src={Humburger} alt="open menu" />
          </button>
        </div>
      </header>
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </div>
  );
}