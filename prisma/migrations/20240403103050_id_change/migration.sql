/*
  Warnings:

  - The primary key for the `PowerReadingArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `powerReadingAreaId` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `PowerReadingArea` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_powerReadingAreaId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "powerReadingAreaId",
ADD COLUMN     "powerReadingAreaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PowerReadingArea" DROP CONSTRAINT "PowerReadingArea_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "PowerReadingArea_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_id_key" ON "PowerReadingArea"("id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_powerReadingAreaId_fkey" FOREIGN KEY ("powerReadingAreaId") REFERENCES "PowerReadingArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
