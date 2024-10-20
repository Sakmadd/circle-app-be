/*
  Warnings:

  - You are about to drop the column `authorId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `likes` table. All the data in the column will be lost.
  - Added the required column `feedId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_targetId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "authorId",
DROP COLUMN "targetId",
ADD COLUMN     "feedId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "feeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
