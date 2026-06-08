import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ExpertsForm from './ExpertsForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ExpertsForm', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<ExpertsForm />);

    await user.click(screen.getByRole('button', { name: 'experts.form.exploreMore' }));

    expect(await screen.findByText('experts.form.validation.nameMin')).toBeInTheDocument();
    expect(screen.getByText('experts.form.validation.petNameRequired')).toBeInTheDocument();
    expect(screen.getByText(/experts\.form\.validation\.invali\s+dPhone/)).toBeInTheDocument();
    expect(screen.getByText('experts.form.validation.invalidEmail')).toBeInTheDocument();
    expect(screen.getByText('experts.form.validation.privacyRequired')).toBeInTheDocument();
  });

  it('submits valid data, shows a success message and resets the form', async () => {
    const user = userEvent.setup();
    render(<ExpertsForm />);

    await user.type(screen.getByPlaceholderText('experts.form.yourName'), 'Olha');
    await user.type(screen.getByPlaceholderText('experts.form.petName'), 'Rex');
    await user.type(screen.getByPlaceholderText('experts.form.yourPhone'), '+380501234567');
    await user.type(screen.getByPlaceholderText('experts.form.yourEmail'), 'olha@example.com');
    await user.click(screen.getByRole('checkbox'));

    await user.click(screen.getByRole('button', { name: 'experts.form.exploreMore' }));

    expect(await screen.findByText('experts.successContact', {}, { timeout: 3000 })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByPlaceholderText('experts.form.yourName')).toHaveValue(''));
  });
});
