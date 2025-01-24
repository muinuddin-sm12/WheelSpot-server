"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be 6 or more characters long' })
        .max(20, { message: 'Password must be 20 or fewer characters long' })
});
exports.UserValidation = {
    userValidationSchema,
};
