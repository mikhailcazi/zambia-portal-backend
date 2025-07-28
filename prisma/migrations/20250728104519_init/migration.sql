/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `advisorEmail` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `advisorName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `advisorPhone` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachments` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biodiversityHotspot` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challenges` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communities` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPerson` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `envImpact` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funding` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generatingRevenue` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outcomes` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partners` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorities` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problems` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profitability` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protectedAreaExpansion` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scalable` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteCapacity` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteEmail` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sitePhone` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smmes` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialImpact` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sustainability` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "title",
ADD COLUMN     "advisorEmail" TEXT NOT NULL,
ADD COLUMN     "advisorName" TEXT NOT NULL,
ADD COLUMN     "advisorPhone" TEXT NOT NULL,
ADD COLUMN     "attachments" JSONB NOT NULL,
ADD COLUMN     "biodiversityHotspot" BOOLEAN NOT NULL,
ADD COLUMN     "challenges" TEXT NOT NULL,
ADD COLUMN     "communities" TEXT NOT NULL,
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "envImpact" TEXT NOT NULL,
ADD COLUMN     "funding" JSONB NOT NULL,
ADD COLUMN     "fundingOptions" TEXT[],
ADD COLUMN     "generatingRevenue" BOOLEAN NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "org" TEXT NOT NULL,
ADD COLUMN     "outcomes" TEXT NOT NULL,
ADD COLUMN     "partners" TEXT NOT NULL,
ADD COLUMN     "priorities" TEXT NOT NULL,
ADD COLUMN     "problems" TEXT NOT NULL,
ADD COLUMN     "profitability" TEXT NOT NULL,
ADD COLUMN     "projectName" TEXT NOT NULL,
ADD COLUMN     "protectedAreaExpansion" BOOLEAN NOT NULL,
ADD COLUMN     "scalable" TEXT NOT NULL,
ADD COLUMN     "siteCapacity" TEXT NOT NULL,
ADD COLUMN     "siteEmail" TEXT NOT NULL,
ADD COLUMN     "siteName" TEXT NOT NULL,
ADD COLUMN     "sitePhone" TEXT NOT NULL,
ADD COLUMN     "smmes" TEXT NOT NULL,
ADD COLUMN     "socialImpact" TEXT NOT NULL,
ADD COLUMN     "solution" TEXT NOT NULL,
ADD COLUMN     "sustainability" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";
