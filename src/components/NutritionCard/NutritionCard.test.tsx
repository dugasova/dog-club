import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NutritionCard from './NutritionCrad';

const dispatch = vi.fn();

const card = {
  id: 1,
  code: 'KBL-1',
  desc: 'Chicken kibble for dogs',
  imsrcOfImg: 'kibble.png',
  price: 25,
  rating: 3,
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../context/useCart', () => ({
  useCart: () => ({ dispatch }),
}));

describe('NutritionCard', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  it('renders the card details and a star for each rating point', () => {
    render(<ul><NutritionCard card={card} /></ul>);

    expect(screen.getByText('nutrition.code: KBL-1')).toBeInTheDocument();
    expect(screen.getByText('25.00$')).toBeInTheDocument();
    expect(screen.getByText(card.desc)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: 'star' })).toHaveLength(card.rating);
  });

  it('dispatches an ADD_ITEM action with the card data when buying', async () => {
    const user = userEvent.setup();
    render(<ul><NutritionCard card={card} /></ul>);

    await user.click(screen.getByRole('button', { name: 'nutrition.buy' }));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      item: { ...card, name: card.desc },
    });
  });
});
