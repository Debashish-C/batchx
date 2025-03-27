-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_batchId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "batchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
