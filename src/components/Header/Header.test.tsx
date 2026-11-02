import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CartItem } from '../../types';
import Header from './Header';

const navigate = vi.fn();
const logOut = vi.fn();
let authUser: { email: string } | null = null;
let cartItems: CartItem[] = [];

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  Link: ({
    children,
    to,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('../../context/useCart', () => ({
  useCart: () => ({ state: { items: cartItems } }),
}));

vi.mock('../../context/AuthContext', () => ({
  UserAuth: () => ({ user: authUser, logOut }),
}));

vi.mock('../Menu/Menu', () => ({ default: () => <nav data-testid="menu" /> }));
vi.mock('../LanguageButton/LanguageButton', () => ({
  default: () => <button data-testid="lang-btn" />,
}));
vi.mock('../MobileMenu/MobileMenu', () => ({
  default: ({ onClose }: { onClose?: () => void }) => (
    <div data-testid="mobile-menu">
      <button onClick={onClose}>close-mobile</button>
    </div>
  ),
}));

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  name: 'Kibble',
  price: 10,
  imgSrc: '',
  code: 'K1',
  rating: 4,
  desc: 'Good kibble',
  quantity: 1,
  ...overrides,
});

const renderHeader = () => render(<Header onContactUsClick={vi.fn()} />);

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authUser = null;
    cartItems = [];
    logOut.mockResolvedValue(undefined);
  });

  it('shows the basket item count when the cart has items', () => {
    cartItems = [item({ quantity: 2 }), item({ id: 2, quantity: 3 })];
    renderHeader();

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('hides the basket count badge when the cart is empty', () => {
    renderHeader();

    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('navigates to /basket when the basket button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'header.basket' }));

    expect(navigate).toHaveBeenCalledWith('/basket');
  });

  it('links the logo to the home page', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'DogClub — home' })).toHaveAttribute('href', '/');
  });

  it('shows login and signup buttons when logged out', () => {
    authUser = null;
    renderHeader();

    expect(screen.getByRole('button', { name: 'header.login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'header.signup' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'header.logout' })).not.toBeInTheDocument();
  });

  it('shows account link and logout button when logged in', () => {
    authUser = { email: 'user@example.com' };
    renderHeader();

    expect(screen.getByRole('link', { name: 'header.account' })).toHaveAttribute(
      'href',
      '/account',
    );
    expect(screen.getByRole('button', { name: 'header.logout' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'header.login' })).not.toBeInTheDocument();
  });

  it('navigates to /login when the login button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'header.login' }));

    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to /signup when the signup button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'header.signup' }));

    expect(navigate).toHaveBeenCalledWith('/signup');
  });

  it('calls logOut and navigates to / when the logout button is clicked', async () => {
    authUser = { email: 'user@example.com' };
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'header.logout' }));

    expect(logOut).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });

  it('calls onContactUsClick when the contact button is clicked', async () => {
    const onContactUsClick = vi.fn();
    const user = userEvent.setup();
    render(<Header onContactUsClick={onContactUsClick} />);

    await user.click(screen.getByRole('button', { name: 'header.contactUs' }));

    expect(onContactUsClick).toHaveBeenCalledTimes(1);
  });

  it('opens the mobile menu when the hamburger button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'header.openMenu' }));

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('closes the mobile menu when MobileMenu calls onClose', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'header.openMenu' }));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'close-mobile' }));

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
