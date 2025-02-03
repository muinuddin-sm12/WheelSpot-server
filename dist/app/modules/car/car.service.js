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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const car_constant_1 = require("./car.constant");
const car_model_1 = require("./car.model");
const createCarIntoDB = (car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.create(car);
    return result;
});
const getAllCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const carsQuery = new QueryBuilder_1.default(car_model_1.CarModel.find(), query)
        .search(car_constant_1.carSearchableFields)
        .filter();
    const result = yield carsQuery.modelQuery;
    return result;
});
const getACarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findById(id);
    return result;
});
const updateACarIntoDB = (id, car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndUpdate(id, car);
    return result;
});
const deleteACarIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndDelete(id);
    return result;
});
exports.CarService = {
    createCarIntoDB,
    getAllCarsFromDB,
    getACarFromDB,
    updateACarIntoDB,
    deleteACarIntoDB,
};
