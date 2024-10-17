import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // Pastikan ini menggunakan @faker-js/faker

const prisma = new PrismaClient();

async function main() {
  // Buat data pengguna dummy
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return await prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password(), // Pastikan untuk mengenkripsi password di aplikasi sebenarnya
          avatar: faker.image.avatar(),
          banner: faker.image.urlPicsumPhotos(),
        },
      });
    })
  );

  // Buat data Feed dummy
  const feeds = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      return await prisma.feed.create({
        data: {
          content: faker.lorem.paragraph(),
          image: faker.image.urlPicsumPhotos(),
          userId: randomUserId,
        },
      });
    })
  );

  // Buat data Reply dummy
  await Promise.all(
    feeds.map(async (feed) => {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      return await prisma.reply.create({
        data: {
          content: faker.lorem.sentence(),
          image: faker.image.urlPicsumPhotos(),
          userId: randomUserId,
          feedId: feed.id,
        },
      });
    })
  );

  // Buat data Like dummy
  await Promise.all(
    feeds.map(async (feed) => {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      return await prisma.like.create({
        data: {
          userId: randomUserId,
          feedId: feed.id,
        },
      });
    })
  );

  // Buat data Follow dummy
  await Promise.all(
    users.map(async (user) => {
      const randomUserToFollow =
        users[Math.floor(Math.random() * users.length)];
      if (user.id !== randomUserToFollow.id) {
        return await prisma.follow.create({
          data: {
            userThatFollowed: user.id,
            userThatFollowing: randomUserToFollow.id,
          },
        });
      }
    })
  );

  console.log('Data dummy berhasil dibuat!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
