import QueryBuilder from '../../builder/QueryBuilder';
import { carSearchableFields } from './car.constant';
import { Car } from './car.interface';
import { CarModel } from './car.model';

const createCarIntoDB = async (car: Car) => {
  const result = await CarModel.create(car);
  return result;
};
const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(CarModel.find(), query).search(carSearchableFields).filter()
  const result = await carsQuery.modelQuery;
  return result;
};

const getACarFromDB = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};
const updateACarIntoDB = async (id: string, car: Partial<Car>) => {
  const result = await CarModel.findByIdAndUpdate(id, car);
  return result;
};
const deleteACarIntoDB = async (id: string) => {
  const result = await CarModel.findByIdAndDelete(id);
  return result;
};

export const CarService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getACarFromDB,
  updateACarIntoDB,
  deleteACarIntoDB,
};
