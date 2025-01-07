/*
  Warnings:

  - Added the required column `title` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "title" TEXT NOT NULL;
