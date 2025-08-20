/*
  Warnings:

  - Changed the type of `status` on the `Proposal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Proposal" ADD COLUMN     "proposalstatus" "public"."ProposalStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;
