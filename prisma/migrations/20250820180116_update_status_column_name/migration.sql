/*
  Warnings:

  - You are about to drop the column `proposalstatus` on the `Proposal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Proposal" DROP COLUMN "proposalstatus",
ADD COLUMN     "proposalStatus" "public"."ProposalStatus" NOT NULL DEFAULT 'PENDING';
