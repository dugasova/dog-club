import { useTranslation } from 'react-i18next';
import './NutritionCard.scss';
import Star from '../../assets/icons/strforfeed.svg';

import { useCart } from '../../context/useCart';
import type { CardData } from '../../types';

type NutritionCardProps = {
  card: CardData;
};

export default function NutritionCard({ card }: NutritionCardProps) {
  const { t } = useTranslation();
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img key={i} src={Star} alt="star" className="nutri-card__star" />);
    }
    return stars;
  };

  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', item: { ...card, name: card.desc } });
  };
  return (
    <li className="nutri-card-item" key={card.code}>
      <p>
        <img
          className="nutri-card-img"
          src={card.imsrcOfImg} alt="img of savaryimg" />
      </p>
      <p className="nutri-card__code">{t('nutrition.code')}: {card.code}</p>
      <p className="nutri-card__stars">
        {renderStars(card.rating)}
      </p>
      <p className="nutri-card__description">{t(card.desc)}</p>
      <p className="nutri-card__price">{card.price}.00$</p>
      <button className="nutri-card__btn" onClick={handleAddToCart}>{t('nutrition.buy')}</button>
    </li>
  );
}
