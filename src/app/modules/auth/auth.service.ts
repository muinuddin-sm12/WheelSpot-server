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
    expiresIn: '7d',
  });

  return {
    accessToken: token,
  };
};

const changePassword = async (
  userId: string,
  payload: { oldPassword: string; newPassword: string },
) => {
  // console.log('user data from auth', userId, payload)
  // checking if the user is exist
  const user = await User.findById(userId).select('password');
  // console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeactivated = user?.deactivate;

  if (isDeactivated) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deactivated !');
  }
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      password: newHashedPassword,
    },
  );

  return null;
};
export const AuthServices = {
  register,
  login,
  changePassword,
};
