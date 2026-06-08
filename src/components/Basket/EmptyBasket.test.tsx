import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmptyBasket from './EmptyBasket';

const navigate = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('EmptyBasket', () => {
  it('renders the empty basket message', () => {
    render(<EmptyBasket />);

    expect(screen.getByRole('heading', { name: 'empty.title' })).toBeInTheDocument();
    expect(screen.getByText('empty.empty')).toBeInTheDocument();
    expect(screen.getByText('empty.desc')).toBeInTheDocument();
  });

  it('navigates to the happy customers page when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<EmptyBasket />);

    await user.click(screen.getByRole('button', { name: 'basket.goToPurchases' }));

    expect(navigate).toHaveBeenCalledWith('/happy-customer');
  });
});
