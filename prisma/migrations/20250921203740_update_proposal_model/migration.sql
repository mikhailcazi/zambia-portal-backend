/*
  Warnings:

  - You are about to drop the column `attachments` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `estimatedInvestment` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalCost` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `attachments` on the `Proposal` table. All the data in the column will be lost.
  - You are about to alter the column `estimatedInvestment` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalCost` on the `Proposal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `socialImpactDescription` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socialImpactDescription` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "attachments",
ALTER COLUMN "businessPlan" DROP NOT NULL,
ALTER COLUMN "companyRegistration" DROP NOT NULL,
ALTER COLUMN "estimatedInvestment" SET DATA TYPE INTEGER,
ALTER COLUMN "financialStatements" DROP NOT NULL,
ALTER COLUMN "other" DROP NOT NULL,
ALTER COLUMN "partnerships" DROP NOT NULL,
ALTER COLUMN "socialImpactDescription" SET NOT NULL,
ALTER COLUMN "techStudies" DROP NOT NULL,
ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Proposal" DROP COLUMN "attachments",
ALTER COLUMN "businessPlan" DROP NOT NULL,
ALTER COLUMN "companyRegistration" DROP NOT NULL,
ALTER COLUMN "estimatedInvestment" SET DATA TYPE INTEGER,
ALTER COLUMN "financialStatements" DROP NOT NULL,
ALTER COLUMN "other" DROP NOT NULL,
ALTER COLUMN "partnerships" DROP NOT NULL,
ALTER COLUMN "socialImpactDescription" SET NOT NULL,
ALTER COLUMN "techStudies" DROP NOT NULL,
ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;
