import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { CardData as InitialCardData } from '../data'; // Renamed import to avoid conflict

export type CardData = { // Exported CardData
  id: number;
  code: string;
  raiting: number;
  desc: string;
  descUk?: string;
  price: number;
  imsrcOfImg: string;
}

export type SortOption = 'Popularity' | 'Cheaper first' | 'More expensive first' | 'By name' | 'New ones first';

export type NutritionContextType = {
  cardsData: CardData[];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sortOption, setSortOption] = useState<SortOption>('Popularity');

  const cardsData = useMemo(() => {
    const sortedData = [...InitialCardData]; // Using InitialCardData

    switch (sortOption) {
      case 'Popularity':
        sortedData.sort((a, b) => b.raiting - a.raiting);
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

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
}
