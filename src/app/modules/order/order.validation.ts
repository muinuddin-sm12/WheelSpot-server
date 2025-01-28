import { z } from 'zod';

export const orderValidationSchema = z.object({
  user: z.string(),
  carDetails: z.string(),
  quantity: z.number().positive().min(1),
  totalPrice: z.number().positive(),
});
