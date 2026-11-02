import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { parseEnv } from './config/env';

const env = parseEnv(import.meta.env);

const firebaseConfig = {
  apiKey: env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_REACT_APP_MESSAGING_SENDER,
  appId: env.VITE_REACT_APP_APP_ID,
  measurementId: env.VITE_REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
