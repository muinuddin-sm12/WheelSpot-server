import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://wheel-spot-client.vercel.app'], credentials: true }));

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Wheel Spot!');
});
export default app;
