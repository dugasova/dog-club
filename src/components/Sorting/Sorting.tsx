import './Sorting.scss';

import { useTranslation } from 'react-i18next';

import { type SortOption, useNutrition } from '../../context/useNutrition';

type SortingProps = {
  handleClick: () => void;
};

const SortingBtn = '/icons/sortblack.svg';
export default function Sorting({ handleClick }: SortingProps) {
  const { sortOption, setSortOption } = useNutrition();
  const { t } = useTranslation();

  const sortingItems: SortOption[] = [
    'Popularity',
    'Cheaper first',
    'More expensive first',
    'By name',
    'New ones first',
  ];

  const handleSortItemClick = (item: SortOption) => {
    setSortOption(item);
    handleClick();
  };

  return (
    <div className="sorting" onClick={handleClick}>
      <div className="sorting-backdrop" onClick={(e) => e.stopPropagation()}>
        <h3 className="sorting-title">{t('sorting.title')}</h3>
        <ul className="sorting-list">
          {sortingItems.map((item, index) => (
            <li
              key={index}
              className={`sorting-item ${item === sortOption ? 'sorting-item--active' : ''}`}
              onClick={() => handleSortItemClick(item)}
            >
              {t(`sorting.options.${item}`)}
              <button className="sorting__btn">
                <img src={SortingBtn} alt="Sort button" className="sorting__img" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
