import { useState } from 'react';
import "./HappyCustomer.scss";
import Sliderarrow from "../../assets/icons/sliderarrow.svg";
import { RxDotFilled } from "react-icons/rx";
import { CUSTOMERS } from '../../data';
import HappyCustomerCard from './HappyCustomerCard';
import { useTranslation } from 'react-i18next';

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
      <div className='happy-customer__wrapper'>
        <button
          className="happy-customer-btn btn__left"
          onClick={prev}
          aria-label="Previous customers"
          disabled={index === 0}
        >
          <img src={Sliderarrow} alt="Prev" />
        </button>

        <ul className='happy-customer__list' aria-live="polite">
          {visible.map((customer) => (
            <HappyCustomerCard
              key={customer.id}
              id={customer.id}
              coment={t(customer.coment)}
              name={t(customer.name)}
              img={customer.img}
              rating={customer.rating}
            />
          ))}
        </ul>

        <button
          className="happy-customer-btn btn__right"
          onClick={next}
          aria-label="Next customers"
          disabled={index === maxIndex}
        >
          <img src={Sliderarrow} alt="Next" />
        </button>
      </div>
      <div>
        {CUSTOMERS.map((_, idx) => (
          <RxDotFilled size={30}
            key={idx}
            className={`happy-customer__dot ${idx >= index && idx < index + visibleCount ? 'active' : ''}`}
            onClick={() => setIndex(Math.min(idx, maxIndex))}
          />
        ))}
      </div>
    </section>
  )
}
