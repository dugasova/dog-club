import { z } from 'zod';

const envSchema = z.object({
  VITE_REACT_APP_FIREBASE_API_KEY: z.string().min(1),
  VITE_REACT_APP_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_REACT_APP_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_REACT_APP_APP_ID: z.string().min(1),
  VITE_REACT_APP_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_REACT_APP_MESSAGING_SENDER: z.string().optional(),
  VITE_REACT_APP_MEASUREMENT_ID: z.string().optional(),
});

export const parseEnv = (source: unknown) => {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const names = result.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`Missing environment variables: ${names}. See .env.example.`);
  }
  return result.data;
};
