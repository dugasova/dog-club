import { describe, expect, it } from 'vitest';

import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('adds cents to a whole number', () => {
    expect(formatPrice(10)).toBe('$10.00');
  });

  it('keeps existing cents', () => {
    expect(formatPrice(9.99)).toBe('$9.99');
  });

  it('separates thousands', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50');
  });
});
