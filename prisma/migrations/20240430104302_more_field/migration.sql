/*
  Warnings:

  - You are about to drop the column `daysActiveWeek` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `hoursActiveDay` on the `Device` table. All the data in the column will be lost.
  - Added the required column `hoursActiveWeek` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "daysActiveWeek",
DROP COLUMN "hoursActiveDay",
ADD COLUMN     "hoursActiveWeek" INTEGER NOT NULL;
