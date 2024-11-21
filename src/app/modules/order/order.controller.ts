import { OrderService } from "./order.service";
import { Request, Response } from "express";
const createOrder = async (req:Request, res: Response) => {
    try{
        const {order: orderData} = req.body;
        const result = await OrderService.createOrderIntoDB(orderData)
        res.status(200).json({
            message: "Order created successfully",
            status: true,
            data: result
        })
    }catch(error){
        console.log(error)
    }
}

export const OrderController = {
    createOrder,
}