import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new Error('User is not found!');
  }
  if (user.deactivate) {
    throw new Error('This user account is deactivated!');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Credentials');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '3d',
  });

  return {
    token,
  };
};
export const AuthServices = {
  register,
  login,
};
