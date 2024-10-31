import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/', router);

app.use((req, res) => {
  res.status(404).send('not-found');
});

export default app;
