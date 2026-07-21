/*
  Warnings:

  - You are about to drop the column `linkedin` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Proposal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "linkedin";

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "linkedin";
