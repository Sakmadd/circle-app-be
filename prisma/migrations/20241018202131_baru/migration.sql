/*
  Warnings:

  - You are about to drop the column `userId` on the `feeds` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `feeds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feeds" DROP CONSTRAINT "feeds_userId_fkey";

-- AlterTable
ALTER TABLE "feeds" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
