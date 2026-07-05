import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageButton from './LanguageButton';

const changeLanguage = vi.fn();
let language = 'en';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language, changeLanguage } }),
}));

describe('LanguageButton', () => {
  beforeEach(() => {
    changeLanguage.mockClear();
  });

  it('shows "UK" and switches to Ukrainian when the current language is English', async () => {
    language = 'en';
    const user = userEvent.setup();
    render(<LanguageButton />);

    const button = screen.getByRole('button', { name: 'UK' });
    await user.click(button);

    expect(changeLanguage).toHaveBeenCalledWith('uk');
  });

  it('shows "EN" and switches to English when the current language is Ukrainian', async () => {
    language = 'uk';
    const user = userEvent.setup();
    render(<LanguageButton />);

    const button = screen.getByRole('button', { name: 'EN' });
    await user.click(button);

    expect(changeLanguage).toHaveBeenCalledWith('en');
  });
});
