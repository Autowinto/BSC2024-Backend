-- CreateTable
CREATE TABLE "DeviceHourlyAverage" (
    "id" SERIAL NOT NULL,
    "hour" INTEGER NOT NULL,
    "wattage" DOUBLE PRECISION NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "DeviceHourlyAverage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceHourlyAverage" ADD CONSTRAINT "DeviceHourlyAverage_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
