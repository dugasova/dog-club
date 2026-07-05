import "./LanguageButton.scss";
import { useTranslation } from 'react-i18next';

export default function LanguageButton() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };
  return (
    <button className="language-button" onClick={toggleLanguage} >
      {i18n.language === 'en' ? 'UK' : 'EN'}
    </button>
  )
}
