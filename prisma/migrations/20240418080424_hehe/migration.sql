/*
  Warnings:

  - You are about to drop the column `powerReadingAreaId` on the `Device` table. All the data in the column will be lost.
  - The primary key for the `PowerReadingArea` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_powerReadingAreaId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "powerReadingAreaId";

-- AlterTable
ALTER TABLE "PowerReadingArea" DROP CONSTRAINT "PowerReadingArea_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PowerReadingArea_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_DeviceToPowerReadingArea" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToPowerReadingArea_AB_unique" ON "_DeviceToPowerReadingArea"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToPowerReadingArea_B_index" ON "_DeviceToPowerReadingArea"("B");

-- AddForeignKey
ALTER TABLE "_DeviceToPowerReadingArea" ADD CONSTRAINT "_DeviceToPowerReadingArea_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToPowerReadingArea" ADD CONSTRAINT "_DeviceToPowerReadingArea_B_fkey" FOREIGN KEY ("B") REFERENCES "PowerReadingArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
