/*
  Warnings:

  - A unique constraint covering the columns `[Stock_No]` on the table `Diamond` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateNumber]` on the table `Diamond_api` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Diamond_Stock_No_key` ON `Diamond`(`Stock_No`);

-- CreateIndex
CREATE UNIQUE INDEX `Diamond_api_certificateNumber_key` ON `Diamond_api`(`certificateNumber`);
