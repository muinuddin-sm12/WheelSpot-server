import cors from "cors";
import express, { Application, Request, Response } from "express";
import { CarRoutes } from "./app/modules/car/car.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
//Car routes
app.use('/api', CarRoutes);

//Order routes
app.use('/api', OrderRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from L2-Assignment-2!");
});
export default app;