import { useState } from 'react';
import "./Services.scss";
import { servicesData } from './../../data'
const Arrowmore = "/icons/servicearrow.svg";
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import ServiceSlider from './ServiceSlider';

export default function Services() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceDescription, setSelectedServiceDescription] = useState("");
  const { t } = useTranslation();

  const handleNavigateToServices = () => {
    navigate('/services')
  }

  const openServiceDescriptionModal = (description: string) => {
    setSelectedServiceDescription(description);
    setShowModal(true);
  };

  const closeServiceDescriptionModal = () => {
    setShowModal(false);
    setSelectedServiceDescription('');
  };

  return (
    <section className='services'>
      <div className="arrow">
        {/* The arrow image will be handled by CSS background-image */}
      </div>
      <div className="container">
        <h2 className="services-title">{t('menu.services')}</h2>

        {/* Mobile: slider */}
        <div className="services-slider-wrapper">
          <ServiceSlider items={servicesData} onCardClick={openServiceDescriptionModal} />
        </div>

        {/* Tablet+: grid */}
        <ul className="services-cards">
          {servicesData.map(({ id, title, src, description }) => (
            <li key={id} className="services-card" onClick={() => openServiceDescriptionModal(t(description))}>
              <img className="services-card_image" src={src} alt={title} />
              <h3 className="services-card_title">{t(`servicecs.${title.toLowerCase()}.title`)}</h3>
            </li>
          ))}
        </ul>

        <div className="services-more">
          <button className='services-card_more' onClick={handleNavigateToServices}>
            {t('services.moreServices')}
            <img className="services-arrow" src={Arrowmore} alt="arrow" />
          </button>
        </div>
      </div>

      {showModal && (
        <Modal handleClick={closeServiceDescriptionModal}>
          <div className="service-description-modal">
            <h2>{t('services.modalTitle')}</h2>
            <p>{selectedServiceDescription}</p>
          </div>
        </Modal>
      )}
    </section>
  )
}
