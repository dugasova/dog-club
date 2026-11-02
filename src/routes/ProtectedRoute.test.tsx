import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ProtectedRoute from './ProtectedRoute';

let authState: { user: { email: string } | null; loading: boolean };

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/context/useAuth', () => ({
  useAuth: () => authState,
}));

const renderAccountPage = () =>
  render(
    <MemoryRouter initialEntries={['/account']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<p>account page</p>} />
        </Route>
        <Route path="/login" element={<p>login page</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProtectedRoute', () => {
  beforeEach(() => {
    authState = { user: null, loading: false };
  });

  it('shows a loading message while the auth state is unknown', () => {
    authState = { user: null, loading: true };
    renderAccountPage();

    expect(screen.getByRole('status')).toHaveTextContent('common.loading');
    expect(screen.queryByText('login page')).not.toBeInTheDocument();
    expect(screen.queryByText('account page')).not.toBeInTheDocument();
  });

  it('redirects to the login page when there is no user', () => {
    renderAccountPage();

    expect(screen.getByText('login page')).toBeInTheDocument();
    expect(screen.queryByText('account page')).not.toBeInTheDocument();
  });

  it('renders the page when the user is logged in', () => {
    authState = { user: { email: 'user@example.com' }, loading: false };
    renderAccountPage();

    expect(screen.getByText('account page')).toBeInTheDocument();
  });
});
