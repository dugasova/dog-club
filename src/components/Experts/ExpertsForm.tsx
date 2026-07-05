import { useTranslation } from 'react-i18next';
import ContactForm from '../ContactForm/ContactForm';
import './Experts.scss';

export default function ExpertsForm() {
  const { t } = useTranslation();

  return (
    <div className="experts-content">
      <h2 className="experts-title">{t('experts.title')}</h2>
      <p className="experts-description">{t('experts.description')}</p>
      <ContactForm
        formClassName="experts-form"
        submitLabel={t('experts.form.exploreMore')}
        submitClassName="experts-form-btn btn"
      />
    </div>
  );
}
