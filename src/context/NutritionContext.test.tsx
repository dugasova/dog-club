import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NutritionProvider, useNutrition, type SortOption } from './NutritionContext';

const { mockCards } = vi.hoisted(() => ({
  mockCards: [
    { id: 1, code: 'A', rating: 3, desc: 'Banana kibble', price: 30, imsrcOfImg: 'a.png' },
    { id: 2, code: 'B', rating: 5, desc: 'Apple kibble', price: 10, imsrcOfImg: 'b.png' },
    { id: 3, code: 'C', rating: 1, desc: 'Cherry kibble', price: 20, imsrcOfImg: 'c.png' },
  ],
}));

vi.mock('../data', () => ({ CardData: mockCards }));

const sortOptions: SortOption[] = [
  'Popularity',
  'Cheaper first',
  'More expensive first',
  'By name',
  'New ones first',
];

function Consumer() {
  const { cardsData, sortOption, setSortOption } = useNutrition();
  return (
    <div>
      <p data-testid="current-option">{sortOption}</p>
      <p data-testid="order">{cardsData.map((c) => c.id).join(',')}</p>
      {sortOptions.map((option) => (
        <button key={option} onClick={() => setSortOption(option)}>{option}</button>
      ))}
    </div>
  );
}

const renderConsumer = () =>
  render(
    <NutritionProvider>
      <Consumer />
    </NutritionProvider>
  );

describe('NutritionProvider', () => {
  it('defaults to sorting by popularity (highest rating first)', () => {
    renderConsumer();

    expect(screen.getByTestId('current-option')).toHaveTextContent('Popularity');
    expect(screen.getByTestId('order')).toHaveTextContent('2,1,3');
  });

  it('sorts by price ascending for "Cheaper first"', async () => {
    const user = userEvent.setup();
    renderConsumer();

    await user.click(screen.getByRole('button', { name: 'Cheaper first' }));

    expect(screen.getByTestId('order')).toHaveTextContent('2,3,1');
  });

  it('sorts by price descending for "More expensive first"', async () => {
    const user = userEvent.setup();
    renderConsumer();

    await user.click(screen.getByRole('button', { name: 'More expensive first' }));

    expect(screen.getByTestId('order')).toHaveTextContent('1,3,2');
  });

  it('sorts alphabetically by description for "By name"', async () => {
    const user = userEvent.setup();
    renderConsumer();

    await user.click(screen.getByRole('button', { name: 'By name' }));

    expect(screen.getByTestId('order')).toHaveTextContent('2,1,3');
  });

  it('sorts by id descending for "New ones first"', async () => {
    const user = userEvent.setup();
    renderConsumer();

    await user.click(screen.getByRole('button', { name: 'New ones first' }));

    expect(screen.getByTestId('order')).toHaveTextContent('3,2,1');
  });
});
