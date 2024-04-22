/*
  Warnings:

  - You are about to drop the `_DeviceToPowerReadingArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DeviceToPowerReadingArea" DROP CONSTRAINT "_DeviceToPowerReadingArea_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeviceToPowerReadingArea" DROP CONSTRAINT "_DeviceToPowerReadingArea_B_fkey";

-- DropTable
DROP TABLE "_DeviceToPowerReadingArea";

-- CreateTable
CREATE TABLE "DeviceOnArea" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "DeviceOnArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceOnArea_deviceId_areaId_key" ON "DeviceOnArea"("deviceId", "areaId");

-- AddForeignKey
ALTER TABLE "DeviceOnArea" ADD CONSTRAINT "DeviceOnArea_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceOnArea" ADD CONSTRAINT "DeviceOnArea_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "PowerReadingArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
