import { describe, expect, it } from 'vitest';

import { parseEnv } from './env';

const validEnv = {
  VITE_REACT_APP_FIREBASE_API_KEY: 'key',
  VITE_REACT_APP_FIREBASE_AUTH_DOMAIN: 'dog-club.firebaseapp.com',
  VITE_REACT_APP_FIREBASE_PROJECT_ID: 'dog-club',
  VITE_REACT_APP_APP_ID: 'app-id',
};

describe('parseEnv', () => {
  it('returns the variables when all required ones are set', () => {
    expect(parseEnv(validEnv)).toEqual(validEnv);
  });

  it('names every missing required variable', () => {
    expect(() => parseEnv({ VITE_REACT_APP_APP_ID: 'app-id' })).toThrow(
      /VITE_REACT_APP_FIREBASE_API_KEY.*VITE_REACT_APP_FIREBASE_AUTH_DOMAIN.*VITE_REACT_APP_FIREBASE_PROJECT_ID/,
    );
  });

  it('treats an empty required variable as missing', () => {
    expect(() => parseEnv({ ...validEnv, VITE_REACT_APP_FIREBASE_API_KEY: '' })).toThrow(
      'VITE_REACT_APP_FIREBASE_API_KEY',
    );
  });
});
