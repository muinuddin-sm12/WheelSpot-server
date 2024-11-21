import { Request, Response } from "express";
import { CarService } from "./car.service";


const createCar = async (req:Request, res:Response)=> {
    try{
        const {car: carData} = req.body;
        const result = await CarService.createCarIntoDB(carData);
        res.status(200).json({
            message: "Car created successfully",
            status: true,
            data: result,
        })
    }catch(error){
        console.log(error)
    }
}
const getAllCars = async (req:Request, res:Response)=> {
    try{
        const result = await CarService.getAllCarsFromDB();
        res.status(200).json({
            message: "Cars retrieved successfully",
            status: true,
            data: result,
        })
    }catch(error){
        console.log(error)
    }
}
const getACar = async (req:Request, res:Response)=> {
    try{
        const id = req.params.id;
        const result = await CarService.getACarFromDB(id);
        res.status(200).json({
            message: "Car retrieved successfully",
            status: true,
            data: result,
        })
    }catch(error){
        console.log(error)
    }
}

export const CarController= {
    createCar,
    getAllCars,
    getACar,
}