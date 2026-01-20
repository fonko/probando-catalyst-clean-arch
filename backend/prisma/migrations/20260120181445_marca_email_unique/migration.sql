/*
  Warnings:

  - A unique constraint covering the columns `[correoElectronico]` on the table `marcas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `marcas_correoElectronico_key` ON `marcas`(`correoElectronico`);
