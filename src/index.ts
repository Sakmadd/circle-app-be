import express from 'express';
import { router } from './routes/routes';

const app = express();
const port: number = 3000;

app.use(express.json());
app.use('/', router);

app.use((req, res) => {
  res.status(404).send('not-found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
