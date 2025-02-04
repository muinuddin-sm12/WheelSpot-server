import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewShcema = new Schema<TReview>({
    carName: {type:String, required:[true, 'Car name is required']},
    review: {type: String, required: [true, 'Review is requied']},
    image: {type: String, required: [true, 'Image is required']},
    customerName : {type:String, required: [true, 'Customer name is required']},
    date: {type:String},
});

export const Review = model<TReview>('Review', reviewShcema);