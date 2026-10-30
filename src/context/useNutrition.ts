import { createContext, useContext } from 'react';
import type { CardData } from '../types';

export type SortOption =
  'Popularity' | 'Cheaper first' | 'More expensive first' | 'By name' | 'New ones first';

export type NutritionContextType = {
  cardsData: CardData[];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
};

export const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
