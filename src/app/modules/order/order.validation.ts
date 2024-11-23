import {z} from 'zod';

export const orderValidationSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    car: z.string(),
    quantity: z.number().positive().min(1),
    totalPrice: z.number().positive()
})
