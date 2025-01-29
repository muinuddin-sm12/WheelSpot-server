import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getAUser);
router.put('/:id', UserController.updateAUser);

export const UserRoutes = router;
