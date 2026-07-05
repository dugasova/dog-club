import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignUp from './SignUp';

const navigate = vi.fn();
const signUp = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) =>
    <a href={to}>{children}</a>,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../context/AuthContext', () => ({
  UserAuth: () => ({ signUp }),
}));

describe('SignUp', () => {
  beforeEach(() => {
    navigate.mockClear();
    signUp.mockReset();
  });

  it('signs up and navigates to the account page on success', async () => {
    signUp.mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<SignUp />);

    await user.type(screen.getByPlaceholderText('Email'), 'olha@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'signup.button' }));

    expect(signUp).toHaveBeenCalledWith('olha@example.com', 'secret123');
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/account'));
  });

  it('shows the error message when sign up fails', async () => {
    signUp.mockRejectedValue(new Error('Email already in use'));
    const user = userEvent.setup();
    render(<SignUp />);

    await user.type(screen.getByPlaceholderText('Email'), 'olha@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'signup.button' }));

    expect(await screen.findByText('Email already in use')).toBeInTheDocument();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('renders a link to the login page', () => {
    render(<SignUp />);

    const link = screen.getByRole('link', { name: 'signup.loginLink' });
    expect(link).toHaveAttribute('href', '/login');
  });
});
