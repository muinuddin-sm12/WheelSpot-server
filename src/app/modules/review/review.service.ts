import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async(data:TReview) => {
    const result = await Review.create(data);
    return result;
}
const getAllReviews = async() => {
    const result = await Review.find();
    return result;
}

export const ReviewServices = {
    createReview,
    getAllReviews
}