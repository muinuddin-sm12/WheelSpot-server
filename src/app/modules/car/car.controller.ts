import { Request, Response } from "express";
import { CarService } from "./car.service";


const createCar = async (req:Request, res:Response)=> {
    try{
        const {car: carData} = req.body;
        const result = await CarService.createCarIntoDB(carData);
        res.status(200).json({
            message: "Car created successfully",
            success: true,
            data: result,
        })
    }catch(error){
        console.log(error)
    }
}

export const CarController= {
    createCar,
}