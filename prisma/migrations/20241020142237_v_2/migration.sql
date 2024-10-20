/*
  Warnings:

  - You are about to drop the column `userFollowedId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `userFollowingId` on the `follows` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_userFollowedId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_userFollowingId_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "userFollowedId",
DROP COLUMN "userFollowingId",
ADD COLUMN     "followerId" INTEGER NOT NULL,
ADD COLUMN     "followingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
