/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CarService } from './car.service';
import { carValidationSchema } from './car.validation';

const createCar = async (req: Request, res: Response) => {
  try {
    // const {car: carData} = req.body;
    const carData = req.body;
    const zodParseData = carValidationSchema.parse(carData);
    const result = await CarService.createCarIntoDB(zodParseData);
    res.status(200).json({
      message: 'Car created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};
const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarService.getAllCarsFromDB();
    res.status(200).json({
      message: 'Cars retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};
const getACar = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const result = await CarService.getACarFromDB(id);
    res.status(200).json({
      message: 'Car retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};
const updateACar = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const body = req.body;
    const result = await CarService.updateACarIntoDB(id, body);
    res.status(200).json({
      message: 'Car updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};
const deleteACar = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const result = await CarService.deleteACarIntoDB(id);
    res.status(200).json({
      message: 'Car deleted successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const CarController = {
  createCar,
  getAllCars,
  getACar,
  updateACar,
  deleteACar,
};
