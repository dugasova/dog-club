import './HappyCustomer.scss';

import { useState } from 'react';
const Sliderarrow = '/icons/sliderarrow.svg';
import { useTranslation } from 'react-i18next';
import { RxDotFilled } from 'react-icons/rx';

import { CUSTOMERS } from '../../data';
import HappyCustomerCard from './HappyCustomerCard';

export default function HappyCustomer() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, CUSTOMERS.length - visibleCount);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const visible = CUSTOMERS.slice(index, index + visibleCount);

  return (
    <section className="happy-customer container">
      <h2 className="happy-customer__title">{t('happycustomers.title')}</h2>

      {/* Mobile: native scroll-snap, all cards */}
      <ul className="happy-customer__scroll-list">
        {CUSTOMERS.map((customer) => (
          <HappyCustomerCard
            key={customer.id}
            id={customer.id}
            comment={t(customer.comment)}
            name={t(customer.name)}
            img={customer.img}
            rating={customer.rating}
          />
        ))}
      </ul>

      {/* Desktop: button navigation, sliced */}
      <div className="happy-customer__wrapper">
        <button
          className="happy-customer-btn btn__left"
          onClick={prev}
          aria-label={t('happycustomers.previous')}
          disabled={index === 0}
        >
          <img src={Sliderarrow} alt="" />
        </button>

        <ul className="happy-customer__list" aria-live="polite">
          {visible.map((customer) => (
            <HappyCustomerCard
              key={customer.id}
              id={customer.id}
              comment={t(customer.comment)}
              name={t(customer.name)}
              img={customer.img}
              rating={customer.rating}
            />
          ))}
        </ul>

        <button
          className="happy-customer-btn btn__right"
          onClick={next}
          aria-label={t('happycustomers.next')}
          disabled={index === maxIndex}
        >
          <img src={Sliderarrow} alt="" />
        </button>
      </div>

      <div className="happy-customer__dots-wrapper">
        {CUSTOMERS.map((_, idx) => (
          <RxDotFilled
            size={30}
            key={idx}
            className={`happy-customer__dot ${idx >= index && idx < index + visibleCount ? 'active' : ''}`}
            onClick={() => setIndex(Math.min(idx, maxIndex))}
          />
        ))}
      </div>
    </section>
  );
}
