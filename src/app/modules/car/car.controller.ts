/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CarService } from './car.service';
import { carValidationSchema } from './car.validation';
import catchAsync from '../../utils/catchAsync';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const carData = req.body;
  const zodParseData = carValidationSchema.parse(carData);
  const result = await CarService.createCarIntoDB(zodParseData);
  res.status(200).json({
    message: 'Car created successfully',
    status: true,
    data: result,
  });
});
const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await CarService.getAllCarsFromDB(req.query);
  res.status(200).json({
    message: 'Cars retrieved successfully',
    status: true,
    data: result,
  });
});
const getACar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.carId;
  const result = await CarService.getACarFromDB(id);
  res.status(200).json({
    message: 'Car retrieved successfully',
    status: true,
    data: result,
  });
});
const updateACar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.carId;
  const body = req.body;
  const result = await CarService.updateACarIntoDB(id, body);
  res.status(200).json({
    message: 'Car updated successfully',
    status: true,
    data: result,
  });
});
const deleteACar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.carId;
  await CarService.deleteACarIntoDB(id);
  res.status(200).json({
    message: 'Car deleted successfully',
    status: true,
    data: {},
  });
});

export const CarController = {
  createCar,
  getAllCars,
  getACar,
  updateACar,
  deleteACar,
};
