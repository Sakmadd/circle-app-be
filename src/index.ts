import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';
import { initRedis } from './libs/redis';
import { PrismaClient } from '@prisma/client';
// import swaggerUI from 'swagger-ui-express';
// import swaggerDoc from './libs/swagger.json';
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

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

// app.use('/doc', swaggerUI.serve);
// app.get(
//   '/doc',
//   swaggerUI.setup(swaggerDoc, {
//     customSiteTitle: 'Circle App Doc API',
//     customCss: `
//                 .swagger-ui .topbar { display: none}
//                 .information-container.wrapper { background: #000; padding: 2rem  }
//                 .information-container .info .main .title { color: #ffffff}
//                 .renderedMarkdown p { margin: 0 !important; color: #ffffff !important }
//                 `,
//     swaggerOptions: {
//       persistAuthorization: true,
//     },
//   })
// );

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
