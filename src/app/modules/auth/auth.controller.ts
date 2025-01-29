import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.body.userId;
  const passwordData = {
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };

  const result = await AuthServices.changePassword(userId, passwordData);
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});
export const AuthController = {
  register,
  login,
  changePassword,
};
