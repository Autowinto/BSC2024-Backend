-- CreateTable
CREATE TABLE "PowerReadingArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "externalId" INTEGER,

    CONSTRAINT "PowerReadingArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "powerReadingAreaId" TEXT,

    CONSTRAINT "DeviceGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "expectedWattage" DOUBLE PRECISION,
    "measuredWattage" DOUBLE PRECISION,
    "powerReadingAreaId" TEXT,
    "deviceGroupsId" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smartPlug" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "devicesId" TEXT NOT NULL,

    CONSTRAINT "smartPlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartPlugMeasurement" (
    "id" TEXT NOT NULL,
    "wattage" DOUBLE PRECISION,
    "timeMeasured" TIMESTAMP(3) NOT NULL,
    "smartPlugId" TEXT NOT NULL,

    CONSTRAINT "SmartPlugMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_id_key" ON "PowerReadingArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_externalId_key" ON "PowerReadingArea"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceGroup_id_key" ON "DeviceGroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceGroup_name_key" ON "DeviceGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_key" ON "Device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "smartPlug_id_key" ON "smartPlug"("id");

-- CreateIndex
CREATE UNIQUE INDEX "smartPlug_Name_key" ON "smartPlug"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "SmartPlugMeasurement_id_key" ON "SmartPlugMeasurement"("id");

-- AddForeignKey
ALTER TABLE "DeviceGroup" ADD CONSTRAINT "DeviceGroup_powerReadingAreaId_fkey" FOREIGN KEY ("powerReadingAreaId") REFERENCES "PowerReadingArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_powerReadingAreaId_fkey" FOREIGN KEY ("powerReadingAreaId") REFERENCES "PowerReadingArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_deviceGroupsId_fkey" FOREIGN KEY ("deviceGroupsId") REFERENCES "DeviceGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smartPlug" ADD CONSTRAINT "smartPlug_devicesId_fkey" FOREIGN KEY ("devicesId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartPlugMeasurement" ADD CONSTRAINT "SmartPlugMeasurement_smartPlugId_fkey" FOREIGN KEY ("smartPlugId") REFERENCES "smartPlug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
