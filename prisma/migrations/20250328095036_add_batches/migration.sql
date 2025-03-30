/*
  Warnings:

  - The primary key for the `Batch` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_batchId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Batch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Batch_id_seq";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "batchId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "BatchUser" (
    "userId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,

    CONSTRAINT "BatchUser_pkey" PRIMARY KEY ("userId","batchId")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchUser" ADD CONSTRAINT "BatchUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchUser" ADD CONSTRAINT "BatchUser_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
