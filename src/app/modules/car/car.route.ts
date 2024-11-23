import express from 'express';
import { CarController } from './car.controller';

const router = express.Router();
router.post('/cars', CarController.createCar);
router.get('/cars', CarController.getAllCars)
router.get('/cars/:carId', CarController.getACar)
router.put('/cars/:carId', CarController.updateACar)
router.delete('/cars/:carId', CarController.deleteACar)
export const CarRoutes = router;