/*
  Warnings:

  - Added the required column `creatorId` to the `SocketsRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocketsRoom" ADD COLUMN     "creatorId" TEXT NOT NULL;
