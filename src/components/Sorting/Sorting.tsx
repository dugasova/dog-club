import './Sorting.scss';

import { useTranslation } from 'react-i18next';

import { type SortOption, useNutrition } from '@/context/useNutrition';
import { useEscapeKey } from '@/hooks/useEscapeKey';

type SortingProps = {
  handleClick: () => void;
};

const SortingBtn = '/icons/sortblack.svg';
export default function Sorting({ handleClick }: SortingProps) {
  useEscapeKey(handleClick);
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
    <div
      className="sorting"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClick();
      }}
    >
      <div className="sorting-backdrop">
        <h3 className="sorting-title">{t('sorting.title')}</h3>
        <ul className="sorting-list">
          {sortingItems.map((item) => (
            <li
              key={item}
              className={`sorting-item ${item === sortOption ? 'sorting-item--active' : ''}`}
            >
              <button
                type="button"
                className="sorting__btn"
                onClick={() => handleSortItemClick(item)}
              >
                {t(`sorting.options.${item}`)}
                <img src={SortingBtn} alt="" className="sorting__img" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
