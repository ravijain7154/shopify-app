/*
  Warnings:

  - You are about to drop the column `createdAt` on the `diamond_api` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `diamond_api` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `diamond_api` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
