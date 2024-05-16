-- CreateTable
CREATE TABLE "DeviceHourlyAverage" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "DeviceHourlyAverage_pkey" PRIMARY KEY ("id")
);
