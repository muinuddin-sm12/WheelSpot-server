import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async(data:TReview) => {
    const result = await Review.create(data);
    return result;
}

export const ReviewServices = {
    createReview,
}