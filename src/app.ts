/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/router';
import axios from "axios";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://wheel-spot-client.vercel.app'], credentials: true }));

// application routes
app.use('/api/v1', router)

router.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: "automobile",
        from: "2025-05-01",
        sortBy: "popularity",
        language: "en",
        pageSize: 4,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Wheel Spot!');
});
export default app;
