import { NavLink } from "react-router-dom";
import "./Footer.scss";
import Logo from "../../assets/icons/logo.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import Dog from "../../assets/dogs/footerdog.png";
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-social">
          <img src={Logo} alt="phone icon" className="footer-content-icon footer-original-logo" />
          <div className="footer-content-contacts">
            <img src={FacebookIcon} alt="facebook icon" className="footer-content-icon" />
            <img src={InstagramIcon} alt="instagram icon" className="footer-content-icon" />
          </div>
        </div>
      </div>
      <div className="footer-content-reference">
        <ul className="footer-nav-items">
          <li className="header-nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "header-nav-link active" : "header-nav-link"
              }
            >
              {t('menu.lessTalk')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "header-nav-link active" : "header-nav-link"
              }
            >
              {t('menu.services')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/happy-customer"
              className={({ isActive }) =>
                isActive ? "header-nav-link active" : "header-nav-link"
              }
            >
              {t('menu.happyCustomer')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "header-nav-link active" : "header-nav-link"
              }
            >
              {t('menu.contact')}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="footer-to-contact">
        <div className="form-group">
          <img src="/src/assets/icons/people.svg" alt="name icon" className="input-icon" />
          <input type="text" id="name" name="name" placeholder={t('footer.form.name')} required className='footer-name' />
        </div>
        <div className="form-group form-group-sms">
          <input type="text" id="name" name="name" placeholder={t('footer.form.sms')} required className='footer-sms' />
        </div>
        <button className="footer-to-contact__btn btn">
          {t('footer.form.contactUs')}
        </button>
        <div className="experts-form-privacy">
          <input className="experts-form-checkbox" type="checkbox" id="privacy" />
          <label htmlFor="privacy">{t('footer.form.privacyAgree')}</label>
        </div>

      </div>
      <div className="footer-pet">
        <img src={Dog} alt="Dog" />
      </div>
      <img src={Logo} alt="logo icon" className="footer-content-icon footer-mobile-logo" />
    </div>
  )
}