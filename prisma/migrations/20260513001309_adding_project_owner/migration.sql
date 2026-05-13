-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectOwnerId" INTEGER;

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "projectOwnerId" INTEGER;

-- CreateTable
CREATE TABLE "ProjectOwner" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT,
    "position" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectOwner_username_key" ON "ProjectOwner"("username");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_projectOwnerId_fkey" FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectOwnerId_fkey" FOREIGN KEY ("projectOwnerId") REFERENCES "ProjectOwner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
