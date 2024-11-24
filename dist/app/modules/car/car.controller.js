"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const car_service_1 = require("./car.service");
const car_validation_1 = require("./car.validation");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const zodParseData = car_validation_1.carValidationSchema.parse(carData);
        const result = yield car_service_1.CarService.createCarIntoDB(zodParseData);
        res.status(200).json({
            message: 'Car created successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_service_1.CarService.getAllCarsFromDB();
        res.status(200).json({
            message: 'Cars retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getACar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const result = yield car_service_1.CarService.getACarFromDB(id);
        res.status(200).json({
            message: 'Car retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const updateACar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const body = req.body;
        const result = yield car_service_1.CarService.updateACarIntoDB(id, body);
        res.status(200).json({
            message: 'Car updated successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const deleteACar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        yield car_service_1.CarService.deleteACarIntoDB(id);
        res.status(200).json({
            message: 'Car deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
exports.CarController = {
    createCar,
    getAllCars,
    getACar,
    updateACar,
    deleteACar,
};
