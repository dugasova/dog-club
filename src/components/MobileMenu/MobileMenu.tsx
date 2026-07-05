import './MobileMenu.scss';
import { NavLink } from 'react-router-dom';
const Logo = '/icons/logo.svg';
const CloseMobile = '/icons/closemobile.svg';
const Instagram = '/icons/instagram.svg';
const Facebook = '/icons/facebook.svg';
import { useTranslation } from 'react-i18next';

export default function MobileMenu({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation();
  const menuItems = [
    { name: t('menu.lessTalk'), link: '/' },
    { name: t('menu.services'), link: '/services' },
    { name: t('menu.happyCustomer'), link: '/happy-customer' },
    { name: t('menu.contact'), link: '/contact' },
  ];

  return (
    <div className='mobile'>
      <header className="mobile-menu-header">
        <img src={Logo} alt="logo" className="mobile-menu-logo" />
        <button className='mobile-menu-close' onClick={() => onClose?.()}>
          <img src={CloseMobile} alt="close menu" className="mobile-menu-close__icon" />
        </button>
      </header>
      <nav className="mobile-menu">
        <ul className="mobile-menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="mobile-menu-item">
              <NavLink to={item.link} className="mobile-menu-link" onClick={() => onClose?.()}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="social">
        <a href="https://www.instagram.com" className="social-link" onClick={() => onClose?.()}>
          <img src={Instagram} alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.facebook.com" className="social-link" onClick={() => onClose?.()}>
          <img src={Facebook} alt="Facebook" className="social-icon" />
        </a>
      </div>
    </div>
  )
}
