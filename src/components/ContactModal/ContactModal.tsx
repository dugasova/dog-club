import React from 'react';
import Modal from '../Modal/Modal';
import './ContactModal.scss';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const contactsSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('experts.form.validation.nameMin')),
  petName: z.string().min(1, t('experts.form.validation.petNameRequired')),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, t('experts.form.validation.invalidPhone')),
  email: z.string().email(t('experts.form.validation.invalidEmail')),
  privacy: z.boolean().refine((val) => val === true, {
    message: t('experts.form.validation.privacyRequired'),
  }),
});
type ContactsFormData = {
  name: string;
  petName: string;
  phone: string;
  email: string;
  privacy: boolean;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const [submittedName, setSubmittedName] = React.useState('');
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactsFormData>({
    resolver: zodResolver(contactsSchema(t)),
    defaultValues: {
      name: '',
      petName: '',
      phone: '',
      email: '',
      privacy: false,
    },
  })

  if (!isOpen) return null;

  const handleSubmitForm = async (data: ContactsFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setSubmittedName(data.name);
    // alert(`Thank you, ${data.name}! We will respond soon.`);
    reset(); // Reset form after successful submission
  };

  return (
    <Modal handleClick={onClose} backdropClassName="contact-modal-backdrop">
      <div className="contact-modal-content">
        <h2 className="contact-modal-title">{t('experts.title')}</h2>
        <p className="contact-modal-description">{t('experts.description')}</p>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="contact-form">
          <div className="form-group">
            <img src="/src/assets/icons/people.svg" alt="name icon" className="input-icon" />
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <input
                  id="name"
                  type="text"
                  {...field}
                  placeholder={t('experts.form.yourName')}
                />
              )}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <img src="/src/assets/icons/dog-barking.svg" alt="pet icon" className="input-icon" />
            <Controller
              name='petName'
              control={control}
              render={({ field }) => (
                <input
                  id="petName"
                  type="text"
                  {...field}
                  placeholder={t('experts.form.petName')}
                />
              )}
            />
            {errors.petName && <p className="error-text">{errors.petName.message}</p>}
          </div>
          <div className="form-group">
            <img src="/src/assets/icons/phone.svg" alt="phone icon" className="input-icon" />
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <input
                  id="phone"
                  type="tel"
                  {...field}
                  placeholder={t('experts.form.yourPhone')}
                />
              )}
            />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </div>
          <div className="form-group">
            <img src="/src/assets/icons/email.svg" alt="email icon" className="input-icon" />
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  {...field}
                  placeholder={t('experts.form.yourEmail')}
                />
              )}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>
          <button type="submit" className="contact-modal-btn">{t('header.contactUs')}</button>
          <div className="experts-form-privacy-container">
            <div className="experts-form-privacy">
              <Controller
                name='privacy'
                control={control}
                render={({ field: { value, ...field } }) => (
                  <input
                    className="experts-form-checkbox"
                    type="checkbox"
                    id="privacy"
                    checked={value}
                    {...field}
                  />
                )}
              />
              <label htmlFor="privacy">{t('experts.form.privacyAgree')}</label>
            </div>
            {errors.privacy && <span className="error-text">{errors.privacy.message}</span>}
          </div>
        </form>
      </div>
      {submittedName && (
        <div className="success-message" onClick={() => setSubmittedName('')}>
          <p className="success-message-text">{t('experts.successContact', { name: submittedName })}</p>
          <span className="success-message-close">×</span>
        </div>
      )}
    </Modal>
  );
}
