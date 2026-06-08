import React, { useState } from 'react';
import './NutriSlider.scss';
import SortingBtn from './../../assets/icons/sortblack.svg';
import { useNutrition } from '../../context/NutritionContext';
import type { CardData } from '../../types';

export default function NutriSlider({ children }: { children: (visibleCards: CardData[]) => React.ReactNode }) {
  const { cardsData } = useNutrition();

  const INITIAL_DISPLAY_COUNT = 12;
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, cardsData.length - INITIAL_DISPLAY_COUNT);

  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 6));
  const handlePrev = () => setIndex((i) => Math.max(0, i - 6));
  const visible = cardsData.slice(index, index + INITIAL_DISPLAY_COUNT)

  return (
    <div className='slider'>
      <div className='slider-content'>
        {children(visible)}
      </div>
      <div className='slider-controls'>
        <button className='slider-btn slider-btn-prev' onClick={handlePrev} disabled={index === 0}>
          <img src={SortingBtn} alt="" />
        </button>
        <span>{`${Math.floor(index / 6) + 1} / ${Math.ceil(cardsData.length / 6)}`}</span>
        <button className='slider-btn slider-btn-next' onClick={handleNext} disabled={index >= maxIndex}>
          <img src={SortingBtn} alt="" />
        </button>
      </div>

    </div>
  )
}