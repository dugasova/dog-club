import React from 'react';
import './NutritionSearch.scss';
import { useTranslation } from 'react-i18next';

interface NutritionSearchProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NutritionSearch({ search, onSearchChange }: NutritionSearchProps) {
  const {t } = useTranslation()
  return (
    <input
      id='search'
      type="text"
      className='nutrition-search'
      placeholder={t("nutrition.placeholder")}
      value={search}
      onChange={onSearchChange}
    />
  )
}
