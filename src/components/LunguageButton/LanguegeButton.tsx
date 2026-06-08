import "./LanguegeButton.scss";
import { useTranslation } from 'react-i18next';

export default function LanguegeButton() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };
  return (
    <button className="languege-button" onClick={toggleLanguage} >
      {i18n.language === 'en' ? 'UK' : 'EN'}
    </button>
  )
}
