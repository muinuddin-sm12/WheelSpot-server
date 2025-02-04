import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const addAReview = catchAsync(async (req: Request, res:Response) => {
    const data = req.body;

})
export const ReviewController = {
    addAReview
}