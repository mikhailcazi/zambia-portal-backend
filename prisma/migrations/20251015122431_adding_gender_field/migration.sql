/*
  Warnings:

  - You are about to drop the column `genderdetails` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `genderdetails` on the `Proposal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "genderdetails",
ADD COLUMN     "genderDetails" TEXT;

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "genderdetails",
ADD COLUMN     "genderDetails" TEXT;
