import { Car } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: Car) => {
    const result = await CarModel.create(car);
    return result;
}
const getAllCarsFromDB = async () => {
    const result = await CarModel.find();
    return result;
}
const getACarFromDB = async (id: string) => {
    const result = await CarModel.findById(id);
    return result;
}
const updateACarIntoDB = async (id: string, car: Partial<Car>) => {
    const result = await CarModel.findByIdAndUpdate(id, car);
    return result;
}
const deleteACarIntoDB = async (id: string) => {
    const result = await CarModel.findByIdAndDelete(id);
    return result;
}


export const CarService = {
    createCarIntoDB,
    getAllCarsFromDB,
    getACarFromDB,
    updateACarIntoDB,
    deleteACarIntoDB
}