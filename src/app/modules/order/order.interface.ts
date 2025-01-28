import { ObjectId } from "mongoose";

export type Order = {
  user: ObjectId;
  carDetails: ObjectId;
  quantity: number;
  totalPrice: number;
  status: boolean;
};
