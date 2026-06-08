import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import HappyCustomer from './HappyCustomer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('HappyCustomer', () => {
  it('renders the title and a slider of customer cards', () => {
    render(<HappyCustomer />);

    expect(screen.getByRole('heading', { name: 'happycustomers.title' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('disables the previous button at the start and enables it after moving forward', async () => {
    const user = userEvent.setup();
    render(<HappyCustomer />);

    const prevButton = screen.getByRole('button', { name: /previous customers/i });
    const nextButton = screen.getByRole('button', { name: /next customers/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    await user.click(nextButton);

    expect(prevButton).not.toBeDisabled();
  });

  it('disables the next button once the end of the list is reached', async () => {
    const user = userEvent.setup();
    render(<HappyCustomer />);

    const nextButton = screen.getByRole('button', { name: /next customers/i });

    await user.click(nextButton);
    await user.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
});
