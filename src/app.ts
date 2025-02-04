import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['https://l2-assignment-4-backend-kappa.vercel.app','http://localhost:5173', 'http://localhost:5175'], credentials: true }));

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from L2-Assignment-4!');
});
export default app;
