/*
  Warnings:

  - You are about to drop the column `contactPerson` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `Proposal` table. All the data in the column will be lost.
  - Made the column `contactEmail` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactName` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactEmail` on table `Proposal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactName` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "contactPerson",
ALTER COLUMN "contactEmail" SET NOT NULL,
ALTER COLUMN "contactName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "contactPerson",
ALTER COLUMN "contactEmail" SET NOT NULL,
ALTER COLUMN "contactName" SET NOT NULL;
