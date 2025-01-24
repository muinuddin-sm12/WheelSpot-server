import { z } from 'zod';

const userValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 or more characters long' })
    .max(20, {message: 'Password must be 20 or fewer characters long'})
});

export const UserValidation = {
    userValidationSchema,
}