import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CUSTOMERS } from '@/data';

import HappyCustomer from './HappyCustomer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('HappyCustomer', () => {
  it('renders the title and a slider of customer cards', () => {
    render(<HappyCustomer />);

    expect(screen.getByRole('heading', { name: 'happycustomers.title' })).toBeInTheDocument();
    // mobile scroll list (all) + desktop visible slice (3)
    expect(screen.getAllByRole('listitem')).toHaveLength(CUSTOMERS.length + 3);
  });

  it('disables the previous button at the start and enables it after moving forward', async () => {
    const user = userEvent.setup();
    render(<HappyCustomer />);

    const prevButton = screen.getByRole('button', { name: 'happycustomers.previous' });
    const nextButton = screen.getByRole('button', { name: 'happycustomers.next' });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    await user.click(nextButton);

    expect(prevButton).not.toBeDisabled();
  });

  it('disables the next button once the end of the list is reached', async () => {
    const user = userEvent.setup();
    render(<HappyCustomer />);

    const nextButton = screen.getByRole('button', { name: 'happycustomers.next' });

    await user.click(nextButton);
    await user.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
});
