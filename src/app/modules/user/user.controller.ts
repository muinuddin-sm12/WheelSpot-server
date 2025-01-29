/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  res.status(200).json({
    message: 'Users retrieved successfully',
    status: true,
    data: result,
  });
});
const getAUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.getAUserFromDB(id);
  res.status(200).json({
    message: 'User retrieved successfully',
    status: true,
    data: result,
  });
});
const updateAUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await UserServices.updateAUserIntoDB(id, body);
  res.status(200).json({
    message: 'User updated successfully',
    status: true,
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getAUser,
  updateAUser
};
