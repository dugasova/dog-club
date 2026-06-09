import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MobileMenu from './MobileMenu';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('MobileMenu', () => {
  it('renders all four navigation links', () => {
    render(<MobileMenu />);

    expect(screen.getByRole('link', { name: 'menu.lessTalk' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'menu.services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'menu.happyCustomer' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'menu.contact' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MobileMenu onClose={onClose} />);

    await user.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when a nav link is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MobileMenu onClose={onClose} />);

    await user.click(screen.getByRole('link', { name: 'menu.services' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when a social link is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MobileMenu onClose={onClose} />);

    await user.click(screen.getByRole('link', { name: 'Instagram' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onClose is not provided', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await expect(user.click(screen.getByRole('button'))).resolves.not.toThrow();
  });
});
