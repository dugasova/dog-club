import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthContextProvider } from './AuthContext';
import { useAuth } from './useAuth';

const {
  mockCreateUser,
  mockSignIn,
  mockSignOut,
  mockOnAuthStateChanged,
  mockUnsubscribe,
  mockDoc,
  mockSetDoc,
} = vi.hoisted(() => ({
  mockCreateUser: vi.fn(),
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
  mockOnAuthStateChanged: vi.fn(),
  mockUnsubscribe: vi.fn(),
  mockDoc: vi.fn(),
  mockSetDoc: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: mockCreateUser,
  signInWithEmailAndPassword: mockSignIn,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
}));

vi.mock('firebase/firestore', () => ({
  doc: mockDoc,
  setDoc: mockSetDoc,
}));

vi.mock('../firebase', () => ({ auth: {} }));
vi.mock('../firestore', () => ({ db: {} }));

const docRef = { id: 'mock-doc-ref' };
const credential = { user: { uid: 'user-1', email: 'user@example.com' } };

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

const renderAuth = () => renderHook(() => useAuth(), { wrapper });

beforeEach(() => {
  vi.clearAllMocks();
  mockDoc.mockReturnValue(docRef);
  mockCreateUser.mockResolvedValue(credential);
  mockSetDoc.mockResolvedValue(undefined);
  mockOnAuthStateChanged.mockReturnValue(mockUnsubscribe);
});

describe('AuthContextProvider', () => {
  describe('signUp', () => {
    it('creates the user and an empty Firestore document', async () => {
      const { result } = renderAuth();

      await act(() => result.current.signUp('user@example.com', 'secret123'));

      expect(mockCreateUser).toHaveBeenCalledWith({}, 'user@example.com', 'secret123');
      expect(mockDoc).toHaveBeenCalledWith({}, 'users', 'user@example.com');
      expect(mockSetDoc).toHaveBeenCalledWith(docRef, { savedFood: [] });
    });

    it('rejects when creating the Firestore document fails', async () => {
      mockSetDoc.mockRejectedValue(new Error('firestore unavailable'));
      const { result } = renderAuth();

      await expect(result.current.signUp('user@example.com', 'secret123')).rejects.toThrow(
        'firestore unavailable',
      );
    });

    it('does not create a Firestore document when creating the user fails', async () => {
      mockCreateUser.mockRejectedValue(new Error('email already in use'));
      const { result } = renderAuth();

      await expect(result.current.signUp('user@example.com', 'secret123')).rejects.toThrow(
        'email already in use',
      );
      expect(mockSetDoc).not.toHaveBeenCalled();
    });
  });

  describe('logIn', () => {
    it('signs in with the given email and password', async () => {
      mockSignIn.mockResolvedValue(credential);
      const { result } = renderAuth();

      const returned = await act(() => result.current.logIn('user@example.com', 'secret123'));

      expect(mockSignIn).toHaveBeenCalledWith({}, 'user@example.com', 'secret123');
      expect(returned).toBe(credential);
    });
  });

  describe('logOut', () => {
    it('signs the user out', async () => {
      mockSignOut.mockResolvedValue(undefined);
      const { result } = renderAuth();

      await act(() => result.current.logOut());

      expect(mockSignOut).toHaveBeenCalledWith({});
    });
  });

  describe('auth state', () => {
    it('starts with no user', () => {
      const { result } = renderAuth();

      expect(result.current.user).toBeNull();
    });

    it('stays loading until Firebase reports the auth state', () => {
      const { result } = renderAuth();
      const authCallback = mockOnAuthStateChanged.mock.calls[0][1] as (user: unknown) => void;

      expect(result.current.loading).toBe(true);

      act(() => authCallback(null));
      expect(result.current.loading).toBe(false);
    });

    it('updates the user when Firebase reports a sign in and sign out', () => {
      const { result } = renderAuth();
      const authCallback = mockOnAuthStateChanged.mock.calls[0][1] as (user: unknown) => void;

      act(() => authCallback({ email: 'user@example.com' }));
      expect(result.current.user).toEqual({ email: 'user@example.com' });

      act(() => authCallback(null));
      expect(result.current.user).toBeNull();
    });

    it('unsubscribes from auth changes on unmount', () => {
      const { unmount } = renderAuth();

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});

describe('useAuth', () => {
  it('throws when used outside of an AuthContextProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within an AuthContextProvider',
    );

    consoleError.mockRestore();
  });
});
