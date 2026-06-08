import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import './Experts.scss';

const expertsSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('experts.form.validation.nameMin')),
  petName: z.string().min(1, t('experts.form.validation.petNameRequired')),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, t('experts.form.validation.invali  dPhone')),
  email: z.string().email(t('experts.form.validation.invalidEmail')),
  privacy: z.boolean().refine((val) => val === true, {
    message: t('experts.form.validation.privacyRequired'),
  }),
});

type ExpertsFormData = {
  name: string;
  petName: string;
  phone: string;
  email: string;
  privacy: boolean;
};

export default function ExpertsForm() {
  const { t } = useTranslation();
  const [submittedName, setSubmittedName] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExpertsFormData>({
    resolver: zodResolver(expertsSchema(t)),
    defaultValues: {
      name: '',
      petName: '',
      phone: '',
      email: '',
      privacy: false,
    },
  });

  const onSubmit = async (data: ExpertsFormData) => {
    try {
      // Simulate API call
      console.log('Form data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedName(data.name);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="experts-content">
      <h2 className="experts-title">
        {t('experts.title')}
      </h2>
      <p className="experts-description">{t('experts.description')}</p>
      <form className="experts-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <img src="/src/assets/icons/people.svg" alt="name icon" className="input-icon" />
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <input
                className='experts-name'
                id="name"
                type="text"
                {...field}
                placeholder={t('experts.form.yourName')}
              />
            )}
          />
        </div>
        {errors.name && <span className="error-text">{errors.name.message}</span>}

        <div className="form-group">
          <img src="/src/assets/icons/dog-barking.svg" alt="pet icon" className="input-icon" />
          <Controller
            name='petName'
            control={control}
            render={({ field }) => (
              <input
                className='experts-name'
                type="text"
                id="petName"
                placeholder={t('experts.form.petName')}
                {...field}
              />
            )}
          />
        </div>
        {errors.petName && <span className="error-text">{errors.petName.message}</span>}

        <div className="form-group">
          <img src="/src/assets/icons/phone.svg" alt="phone icon" className="input-icon" />
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <input
                className='experts-name'
                type="tel"
                id="phone"
                placeholder={t('experts.form.yourPhone')}
                {...field}
              />
            )}
          />
        </div>
        {errors.phone && <span className="error-text">{errors.phone.message}</span>}

        <div className="form-group">
          <img src="/src/assets/icons/email.svg" alt="email icon" className="input-icon" />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <input
                className='experts-name'
                type="email"
                id="email"
                {...field}
                placeholder={t('experts.form.yourEmail')}
              />
            )}
          />
        </div>
        {errors.email && <span className="error-text">{errors.email.message}</span>}

        <button type="submit" disabled={isSubmitting} className="experts-form-btn btn">
          {isSubmitting ? t('experts.form.sending') : t('experts.form.exploreMore')}
        </button>

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
      {submittedName && (
        <div className="success-message" onClick={() => setSubmittedName('')}>
          <p className="success-message-text">{t('experts.successContact', { name: submittedName })}</p>
          <span className="success-message-close">×</span>
        </div>
      )}
    </div>
  );
}
