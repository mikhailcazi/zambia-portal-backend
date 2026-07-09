/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `ProjectOwner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectOwner" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);
