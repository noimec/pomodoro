import { z } from 'zod';

export const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Минимум 3 символа' })
    .max(20, { message: 'Не больше 20 символов' })
    .regex(/^[A-Za-z]+$/i, { message: 'Только латинские буквы' }),
  password: z
    .string()
    .min(6, { message: 'Минимум 6 символов' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: 'Минимум 6 символов, буквы и цифры',
    }),
});
