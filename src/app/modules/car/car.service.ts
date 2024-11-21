import { Car } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: Car) => {
    const result = await CarModel.create(car);
    return result;
}

export const CarService = {
    createCarIntoDB,
}