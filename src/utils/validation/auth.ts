import { z } from 'zod';

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'invalid-password-length' })
      .max(100, { message: 'invalid-password-length' }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'invalid-password-no-match',
  });

export const registerFormSchema = z.object({
  name: z.string().min(2, { message: 'invalid-name-length' }).max(50, { message: 'invalid-name-length' }),
  email: z.string().max(100, { message: 'invalid-email-length' }).email({ message: 'invalid-email' }).trim(),
  passwordForm: passwordSchema,
});
