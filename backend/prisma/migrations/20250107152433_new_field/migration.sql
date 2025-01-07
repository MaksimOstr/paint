/*
  Warnings:

  - Added the required column `imageData` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "imageData" TEXT NOT NULL;
