/*
  Warnings:

  - Added the required column `categoryId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DeviceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DeviceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory_id_key" ON "DeviceCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory_name_key" ON "DeviceCategory"("name");
