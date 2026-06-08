import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import NutriSlider from './NutriSlider';
import type { CardData } from '../../context/NutritionContext';

const cardsData: CardData[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  code: `CODE-${i + 1}`,
  raiting: 4,
  desc: `Card ${i + 1}`,
  price: 10 + i,
  imsrcOfImg: `card-${i + 1}.png`,
}));

vi.mock('../../context/NutritionContext', async (importOriginal: () => Promise<unknown>) => {
  const actual = await importOriginal() as typeof import('../../context/NutritionContext');
  return { ...actual, useNutrition: () => ({ cardsData }) };
});

const renderSlider = () =>
  render(
    <NutriSlider>
      {(visible) => <ul>{visible.map((c) => <li key={c.id}>{c.desc}</li>)}</ul>}
    </NutriSlider>
  );

describe('NutriSlider', () => {
  it('shows the first page of 12 cards with the prev button disabled', () => {
    renderSlider();

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 12')).toBeInTheDocument();
    expect(screen.queryByText('Card 13')).not.toBeInTheDocument();
    expect(screen.getByText('1 / 4')).toBeInTheDocument();
    expect(document.querySelector('.slider-btn-prev')).toBeDisabled();
    expect(document.querySelector('.slider-btn-next')).toBeEnabled();
  });

  it('moves forward by 6 cards when the next button is clicked', async () => {
    const user = userEvent.setup();
    renderSlider();

    await user.click(document.querySelector('.slider-btn-next')!);

    expect(screen.getByText('Card 7')).toBeInTheDocument();
    expect(screen.getByText('Card 18')).toBeInTheDocument();
    expect(screen.queryByText('Card 1')).not.toBeInTheDocument();
    expect(screen.getByText('2 / 4')).toBeInTheDocument();
    expect(document.querySelector('.slider-btn-prev')).toBeEnabled();
  });

  it('disables the next button once the maximum index is reached', async () => {
    const user = userEvent.setup();
    renderSlider();

    await user.click(document.querySelector('.slider-btn-next')!);
    await user.click(document.querySelector('.slider-btn-next')!);

    expect(screen.getByText('Card 9')).toBeInTheDocument();
    expect(screen.getByText('Card 20')).toBeInTheDocument();
    expect(document.querySelector('.slider-btn-next')).toBeDisabled();
  });

  it('moves backward by 6 cards when the prev button is clicked', async () => {
    const user = userEvent.setup();
    renderSlider();

    await user.click(document.querySelector('.slider-btn-next')!);
    await user.click(document.querySelector('.slider-btn-next')!);
    await user.click(document.querySelector('.slider-btn-prev')!);

    expect(screen.getByText('Card 3')).toBeInTheDocument();
    expect(screen.getByText('Card 14')).toBeInTheDocument();
  });
});
