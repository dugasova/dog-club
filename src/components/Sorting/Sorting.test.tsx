import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sorting from './Sorting';

const setSortOption = vi.fn();
let sortOption = 'Popularity';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../context/NutritionContext', () => ({
  useNutrition: () => ({ sortOption, setSortOption }),
}));

describe('Sorting', () => {
  beforeEach(() => {
    setSortOption.mockClear();
    sortOption = 'Popularity';
  });

  it('renders the sorting title and all options', () => {
    render(<Sorting handleClick={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'sorting.title' })).toBeInTheDocument();
    expect(screen.getByText('sorting.options.Cheaper first')).toBeInTheDocument();
    expect(screen.getByText('sorting.options.New ones first')).toBeInTheDocument();
  });

  it('marks the active sort option', () => {
    sortOption = 'By name';
    render(<Sorting handleClick={vi.fn()} />);

    expect(screen.getByText('sorting.options.By name').closest('li')).toHaveClass('sorting-item--active');
    expect(screen.getByText('sorting.options.Popularity').closest('li')).not.toHaveClass('sorting-item--active');
  });

  it('selects an option and closes the panel when an item is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Sorting handleClick={handleClick} />);

    await user.click(screen.getByText('sorting.options.Cheaper first'));

    expect(setSortOption).toHaveBeenCalledWith('Cheaper first');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('closes the panel when clicking outside the sorting list', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Sorting handleClick={handleClick} />);

    await user.click(screen.getByRole('heading', { name: 'sorting.title' }).closest('.sorting')!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
