import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post('/', ReviewController.addAReview);
router.get('/', ReviewController.getAllReview);

export const ReviewRoutes = router;
