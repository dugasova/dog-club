import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { CardData as InitialCardData } from '../data';
import { NutritionContext, type SortOption } from './useNutrition';

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sortOption, setSortOption] = useState<SortOption>('Popularity');

  const cardsData = useMemo(() => {
    const sortedData = [...InitialCardData];

    switch (sortOption) {
      case 'Popularity':
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      case 'Cheaper first':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'More expensive first':
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case 'By name':
        sortedData.sort((a, b) => a.desc.localeCompare(b.desc));
        break;
      case 'New ones first':
        sortedData.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    return sortedData;
  }, [sortOption]);

  return (
    <NutritionContext.Provider value={{ cardsData, sortOption, setSortOption }}>
      {children}
    </NutritionContext.Provider>
  );
};
