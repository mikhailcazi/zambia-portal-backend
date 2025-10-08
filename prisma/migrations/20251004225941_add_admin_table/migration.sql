/*
  Warnings:

  - Made the column `categoriesOther` on table `Proposal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fundingOptionsOther` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('REVIEWER');

-- AlterTable
ALTER TABLE "public"."Proposal" ALTER COLUMN "categoriesOther" SET NOT NULL,
ALTER COLUMN "fundingOptionsOther" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."AdminRole" NOT NULL DEFAULT 'REVIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "public"."Admin"("username");
