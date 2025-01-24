import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from L2-Assignment-4!');
});
export default app;
