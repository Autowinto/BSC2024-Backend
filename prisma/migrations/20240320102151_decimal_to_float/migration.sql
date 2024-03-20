/*
  Warnings:

  - You are about to alter the column `wattage` on the `SmartPlugMeasurement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "SmartPlugMeasurement" ALTER COLUMN "wattage" SET DATA TYPE DOUBLE PRECISION;
