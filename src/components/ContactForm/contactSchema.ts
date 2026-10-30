import { z } from 'zod';
export const contactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('experts.form.validation.nameMin')),
    petName: z.string().min(1, t('experts.form.validation.petNameRequired')),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, t('experts.form.validation.invalidPhone')),
    email: z.string().email(t('experts.form.validation.invalidEmail')),
    privacy: z.boolean().refine((val) => val === true, {
      message: t('experts.form.validation.privacyRequired'),
    }),
  });
export type ContactFormData = z.infer<ReturnType<typeof contactSchema>>;
