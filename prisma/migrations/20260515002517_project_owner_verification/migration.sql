-- AlterTable
ALTER TABLE "ProjectOwner" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT,
ADD COLUMN     "verifyTokenExp" TIMESTAMP(3);
