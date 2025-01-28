import express from 'express';
import { CarController } from './car.controller';

const router = express.Router();
router.post('/', CarController.createCar);
router.get('/', CarController.getAllCars);
router.get('/:carId', CarController.getACar);
router.put('/:carId', CarController.updateACar);
router.delete('/:carId', CarController.deleteACar);
export const CarRoutes = router;
