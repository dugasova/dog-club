import './EmptyBasket.scss';
import Cat from './../../assets/dogs/cat-basket.png'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function EmptyBasket() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleGoToPurchases = () => {
    navigate('/happy-customer')
  }
  return (
    <div className='basket-empty'>
      <h1 className='basket-empty__title'>{t('empty.title')}</h1>
      <p className='basket-empty__image'>
        <img src={Cat} alt="" />
      </p>
      <p className='basket-empty__emphiseze'>{t("empty.empty")}</p>
      <p className='basket-empty__desc'>{t("empty.desc")}</p>
      <button onClick={handleGoToPurchases} className='basket-empty__btn'>{t("basket.goToPurchases")}</button>
    </div>
  )
}
