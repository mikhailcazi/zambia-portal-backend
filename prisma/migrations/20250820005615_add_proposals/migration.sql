/*
  Warnings:

  - A unique constraint covering the columns `[proposalId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."ProposalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "proposalId" TEXT;

-- CreateTable
CREATE TABLE "public"."Proposal" (
    "id" TEXT NOT NULL,
    "status" "public"."ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "projectName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteCapacity" TEXT NOT NULL,
    "sitePhone" TEXT NOT NULL,
    "siteEmail" TEXT NOT NULL,
    "advisorName" TEXT NOT NULL,
    "advisorPhone" TEXT NOT NULL,
    "advisorEmail" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "partners" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "problems" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "priorities" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL,
    "challenges" TEXT NOT NULL,
    "biodiversityHotspot" BOOLEAN NOT NULL,
    "protectedAreaExpansion" BOOLEAN NOT NULL,
    "generatingRevenue" BOOLEAN NOT NULL,
    "communities" TEXT NOT NULL,
    "smmes" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "scalable" TEXT NOT NULL,
    "envImpact" TEXT NOT NULL,
    "socialImpact" TEXT NOT NULL,
    "sustainability" TEXT NOT NULL,
    "profitability" TEXT NOT NULL,
    "funding" JSONB NOT NULL,
    "fundingOptions" TEXT[],
    "attachments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_proposalId_key" ON "public"."Project"("proposalId");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "public"."Proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
