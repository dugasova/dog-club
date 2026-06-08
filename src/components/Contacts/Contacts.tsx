import { useTranslation } from 'react-i18next';
import './Contacts.scss';

import emailIcon from '../../assets/icons/email.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import ExpertsForm from '../Experts/ExpertsForm';

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <section className="contacts">
      <div className="contacts__container">
        <h2 className="contacts__title">{t('contacts.title')}</h2>
        <p className="contacts__description">
          {t('contacts.description')}
        </p>

        <div className="contacts__info-social">
          <div className="contacts__info">
            <h3 className="contacts__subtitle">{t('contacts.infoTitle')}</h3>
            <div className="contacts__item">
              <img src={phoneIcon} alt="Phone" className="contacts__icon" />
              <a href="tel:+1234567890" className="contacts__link">+1 (234) 567-890</a>
            </div>
            <div className="contacts__item">
              <img src={emailIcon} alt="Email" className="contacts__icon" />
              <a href="mailto:info@dogclub.com" className="contacts__link">info@dogclub.com</a>
            </div>
            <div className="contacts__item">
              <p>{t('contacts.address')}12345</p>
            </div>
          </div>

          <div className="contacts__social">
            <h3 className="contacts__subtitle">{t('contacts.followTitle')}</h3>
            <div className="contacts__social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" className="contacts__social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="contacts__social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="contacts__form-wrapper">
          <ExpertsForm />
        </div>
      </div>
    </section>
  );
}
