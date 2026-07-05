import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const contactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('experts.form.validation.nameMin')),
    petName: z.string().min(1, t('experts.form.validation.petNameRequired')),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, t('experts.form.validation.invalidPhone')),
    email: z.string().email(t('experts.form.validation.invalidEmail')),
    privacy: z.boolean().refine((val) => val === true, {
      message: t('experts.form.validation.privacyRequired'),
    }),
  });

export type ContactFormData = {
  name: string;
  petName: string;
  phone: string;
  email: string;
  privacy: boolean;
};

interface ContactFormProps {
  formClassName?: string;
  submitLabel: string;
  submitClassName?: string;
}

export default function ContactForm({ formClassName, submitLabel, submitClassName }: ContactFormProps) {
  const { t } = useTranslation();
  const [submittedName, setSubmittedName] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema(t)),
    defaultValues: { name: '', petName: '', phone: '', email: '', privacy: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedName(data.name);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <>
      <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <img src="/icons/people.svg" alt="name icon" className="input-icon" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input id="name" type="text" {...field} placeholder={t('experts.form.yourName')} />
            )}
          />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <img src="/icons/dog-barking.svg" alt="pet icon" className="input-icon" />
          <Controller
            name="petName"
            control={control}
            render={({ field }) => (
              <input id="petName" type="text" {...field} placeholder={t('experts.form.petName')} />
            )}
          />
          {errors.petName && <span className="error-text">{errors.petName.message}</span>}
        </div>

        <div className="form-group">
          <img src="/icons/phone.svg" alt="phone icon" className="input-icon" />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input id="phone" type="tel" {...field} placeholder={t('experts.form.yourPhone')} />
            )}
          />
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <img src="/icons/email.svg" alt="email icon" className="input-icon" />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input id="email" type="email" {...field} placeholder={t('experts.form.yourEmail')} />
            )}
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className={submitClassName}>
          {isSubmitting ? t('experts.form.sending') : submitLabel}
        </button>

        <div className="experts-form-privacy-container">
          <div className="experts-form-privacy">
            <Controller
              name="privacy"
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

      {submittedName && (
        <div className="success-message" onClick={() => setSubmittedName('')}>
          <p className="success-message-text">{t('experts.successContact', { name: submittedName })}</p>
          <span className="success-message-close">×</span>
        </div>
      )}
    </>
  );
}
