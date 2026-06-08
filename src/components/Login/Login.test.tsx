import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';

const navigate = vi.fn();
const logIn = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => navigate,
}));

vi.mock('../../context/AuthContext', () => ({
  UserAuth: () => ({ logIn }),
}));

describe('Login', () => {
  beforeEach(() => {
    navigate.mockClear();
    logIn.mockReset();
  });

  it('logs in and navigates to the account page on success', async () => {
    logIn.mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText('Email'), 'olha@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(logIn).toHaveBeenCalledWith('olha@example.com', 'secret123');
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/account'));
  });

  it('shows an error message when login fails', async () => {
    logIn.mockRejectedValue(new Error('invalid-credential'));
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText('Email'), 'olha@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong-password');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(await screen.findByText('Invalid email or password. Please try again.')).toBeInTheDocument();
    expect(navigate).not.toHaveBeenCalled();
  });
});
