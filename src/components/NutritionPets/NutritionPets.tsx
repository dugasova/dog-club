import './NutritionPets.scss';

import React, { useState } from 'react';

import NutritionCard from '../NutritionCard/NutritionCard';
const SortingArrow = '/icons/sorting-arrow.svg';
import { useTranslation } from 'react-i18next';

import { useNutrition } from '@/context/useNutrition';
import useNutriSearch from '@/hooks/useNutriSearch';
import { SearchActionType } from '@/store/search/action';

import NutritionSearch from '../NutritionSearch/NutritionSearch';
import Sorting from '../Sorting/Sorting';

export default function NutritionPets() {
  const INITIAL_DISPLAY_COUNT = 8;
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [sort, setSort] = useState(false);
  const { cardsData, sortOption } = useNutrition();
  const { t } = useTranslation();

  const translatedCards = React.useMemo(
    () =>
      cardsData.map((card) => ({
        ...card,
        desc: t(card.desc),
      })),
    [cardsData, t],
  );

  const { stateSearch, dispatchSearch } = useNutriSearch(translatedCards);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };
  const handleShowLess = () => {
    setDisplayCount((prev) => Math.max(INITIAL_DISPLAY_COUNT, prev - 6));
  };
  const visibleCards = stateSearch.searchList.slice(0, displayCount);

  const handleClick = () => {
    setSort((prev) => !prev);
  };

  return (
    <div className="nutri">
      <div className="container">
        <h1 className="nutri-title">Nutrition</h1>
        <div className="nutri-sort">
          <NutritionSearch
            search={stateSearch.search}
            onSearchChange={(e) =>
              dispatchSearch({ type: SearchActionType.SEARCH_SET, payload: e.target.value })
            }
          />
          <button className="nutri-sorting__btn" onClick={handleClick}>
            <img className="nutri-sorting__arrow" src={SortingArrow} alt="sorting arrow" />
          </button>
          <p className="nutri-sorting__description">{t(`sorting.options.${sortOption}`)}</p>
        </div>

        <div className="nutri-card">
          {stateSearch.searchList.length === 0 && stateSearch.search.length > 0 ? (
            <p className="nutri-card__not-found">
              {t('nutrition.found')} "{stateSearch.search}"
            </p>
          ) : (
            <ul className="nutri-card-list">
              {visibleCards.map((card) => (
                <NutritionCard card={card} key={card.id} />
              ))}
            </ul>
          )}
          <div className="nutri-display-buttons">
            {displayCount < stateSearch.searchList.length && (
              <button className="nutri-button" onClick={handleShowMore}>
                {t('nutrition.more')}
              </button>
            )}
            {displayCount > INITIAL_DISPLAY_COUNT && (
              <button className="nutri-button" onClick={handleShowLess}>
                {t('nutrition.less')}
              </button>
            )}
          </div>
          <div>{sort && <Sorting handleClick={handleClick} />}</div>
        </div>
      </div>
    </div>
  );
}
