import cors from "cors";
import express, { Application, Request, Response } from "express";
import { CarRoutes } from "./app/modules/car/car.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api', CarRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from L2-Assignment-2!");
});
export default app;