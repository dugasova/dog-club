import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HappyCustomerCard from './HappyCustomerCard';

describe('HappyCustomerCard', () => {
  it('renders the customer name, comment and photo', () => {
    render(
      <ul>
        <HappyCustomerCard id={1} name="Olha" coment="Great food!" img="olha.png" rating="4/5" />
      </ul>
    );

    expect(screen.getByRole('heading', { name: 'Olha' })).toBeInTheDocument();
    expect(screen.getByText('Great food!')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Olha' })).toHaveAttribute('src', 'olha.png');
  });

  it('fills the number of stars matching the rating', () => {
    render(
      <ul>
        <HappyCustomerCard id={1} name="Olha" coment="Great food!" img="olha.png" rating="3/5" />
      </ul>
    );

    const stars = screen.getAllByRole('img', { name: 'star' });
    expect(stars).toHaveLength(5);
    expect(stars.slice(0, 3).every(star => star.getAttribute('src')?.includes('%23FFAA00'))).toBe(true);
    expect(stars.slice(3).every(star => star.getAttribute('src')?.includes('%23F1F3FF'))).toBe(true);
  });

  it('treats an unparseable rating as zero filled stars', () => {
    render(
      <ul>
        <HappyCustomerCard id={1} name="Olha" coment="Great food!" img="olha.png" rating="n/a" />
      </ul>
    );

    const stars = screen.getAllByRole('img', { name: 'star' });
    expect(stars.every(star => star.getAttribute('src')?.includes('%23F1F3FF'))).toBe(true);
  });
});
