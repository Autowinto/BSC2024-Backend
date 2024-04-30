/*
  Warnings:

  - Added the required column `daysActiveWeek` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursActiveDay` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "daysActiveWeek" INTEGER NOT NULL,
ADD COLUMN     "hoursActiveDay" INTEGER NOT NULL;
