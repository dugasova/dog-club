import './ContactModal.scss';

import { useTranslation } from 'react-i18next';

import ContactForm from '../ContactForm/ContactForm';
import Modal from '../Modal/Modal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal handleClick={onClose} backdropClassName="contact-modal-backdrop">
      <div className="contact-modal-content">
        <h2 className="contact-modal-title">{t('experts.title')}</h2>
        <p className="contact-modal-description">{t('experts.description')}</p>
        <ContactForm
          formClassName="contact-form"
          submitLabel={t('header.contactUs')}
          submitClassName="contact-modal-btn"
        />
      </div>
    </Modal>
  );
}
