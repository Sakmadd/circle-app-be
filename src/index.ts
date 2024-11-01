import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';
import { initRedis } from './libs/redis';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const port: number = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

async function main() {
  app.use('/', router);

  app.use((req, res) => {
    res.status(404).send('not-found');
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

initRedis().then(() => {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
