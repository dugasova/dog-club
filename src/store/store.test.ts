import { describe, it, expect } from 'vitest';
import { actionCreator } from './store';

describe('actionCreator', () => {
  it('builds an action object with the given type and payload', () => {
    expect(actionCreator('SEARCH_SET', 'kibble')).toEqual({ type: 'SEARCH_SET', payload: 'kibble' });
  });

  it('supports object payloads', () => {
    const payload = { list: [1, 2, 3], value: 'kib' };

    expect(actionCreator('LIST_SEARCH', payload)).toEqual({ type: 'LIST_SEARCH', payload });
  });

  it('supports actions without a meaningful payload', () => {
    expect(actionCreator('CLEAR_CART', undefined)).toEqual({ type: 'CLEAR_CART', payload: undefined });
  });
});
