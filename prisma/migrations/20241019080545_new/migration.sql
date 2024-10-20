-- DropForeignKey
ALTER TABLE "feeds" DROP CONSTRAINT "feeds_authorId_fkey";

-- AlterTable
ALTER TABLE "feeds" ADD COLUMN     "badLabels" TEXT[],
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
