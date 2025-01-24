import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    deactivate: false;
}
export type TUserRole = keyof typeof USER_ROLE;