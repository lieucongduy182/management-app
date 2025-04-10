/*
  Warnings:

  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `TaskAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `productManagerUserId` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "assignedAt";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "productManagerUserId",
ADD COLUMN     "projectManagerUserId" INTEGER;
