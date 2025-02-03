import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { router } from './routes/routes';
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

async function main() {
  app.use('/', router);

  app.use((req, res) => {
    res.status(404).send('not-found');
  });

  app.listen(port, () => {
    console.log(`Server running at port : ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = app;
