/*
  Warnings:

  - You are about to drop the column `userThatFollowed` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `userThatFollowing` on the `follows` table. All the data in the column will be lost.
  - Added the required column `userFollowedId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFollowingId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_userThatFollowed_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_userThatFollowing_fkey";

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "userThatFollowed",
DROP COLUMN "userThatFollowing",
ADD COLUMN     "userFollowedId" INTEGER NOT NULL,
ADD COLUMN     "userFollowingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userFollowedId_fkey" FOREIGN KEY ("userFollowedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userFollowingId_fkey" FOREIGN KEY ("userFollowingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
