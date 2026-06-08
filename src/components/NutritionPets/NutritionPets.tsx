import React, { useState } from 'react';
import "./NutritionPets.scss";
import NutritionCard from '../NutritionCard/NutritionCrad';
import SortingArrow from '../../assets/icons/sorting-arrow.svg';
import { useNutrition } from '../../context/NutritionContext';
import { useTranslation } from 'react-i18next';
import Sorting from '../Sorting/Sorting';
import NutritionSearch from '../NutritionSearch/NutritionSearch';
import useNutriSearch from '../../hooks/useNutriSearch';
import { actionCreator } from '../../store/store';
import { SEARCH_SET } from '../../store/search/action';

export default function NutritionPets() {
  const INITIAL_DISPLAY_COUNT = 8;
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [sort, setSort] = useState(false);
  const { cardsData, sortOption } = useNutrition();
  const { t } = useTranslation();

  const translatedCards = React.useMemo(() => cardsData.map(card => ({
    ...card,
    desc: t(card.desc)
  })), [cardsData, t]);

  const { stateSearch, dispatchSearch } = useNutriSearch(translatedCards);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };
  const handleShowLess = () => {
    setDisplayCount(prev => Math.max(INITIAL_DISPLAY_COUNT, prev - 6));
  };
  const visibleCards = stateSearch.searchList.slice(0, displayCount);

  const handleClick = () => {
    setSort(prev => !prev);
  };

  return (
    <div className="nutri">
      <div className="container">
        <h1 className="nutri-title">Nutrition</h1>
        <div className="nutri-sort">
          <NutritionSearch
            search={stateSearch.search}
            onSearchChange={(e) => dispatchSearch(actionCreator(SEARCH_SET, e.target.value))}
          />
          <button className="nutri-sorting__btn" onClick={handleClick}>
            <img className="nutri-sorting__arrow" src={SortingArrow} alt="sorting arrow" />
          </button>
          <p className="nutri-sorting__description">{t(`sorting.options.${sortOption}`)}</p>
        </div>

        <div className="nutri-card">
          {stateSearch.searchList.length === 0 && stateSearch.search.length > 0 ? (
            <p className="nutri-card__not-found">{t("nutrition.found")} "{stateSearch.search}"</p>
          ) : (
            <ul className="nutri-card-list">
              {visibleCards.map((card) => (
                <NutritionCard card={card} key={card.id} />
              ))}
            </ul>
          )}
          <div className="nutri-display-buttons">
            {displayCount < stateSearch.searchList.length && (
              <button className="nutri-button" onClick={handleShowMore}>{t("nutrition.more")}</button>
            )}
            {displayCount > INITIAL_DISPLAY_COUNT && (
              <button className="nutri-button" onClick={handleShowLess}>{t("nutrition.less")}</button>
            )}
          </div>
          <div>
            {sort && <Sorting handleClick={handleClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}
