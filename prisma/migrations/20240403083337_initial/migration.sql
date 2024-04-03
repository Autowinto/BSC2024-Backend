-- CreateTable
CREATE TABLE "PowerReadingArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,

    CONSTRAINT "PowerReadingArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "expectedWattage" DOUBLE PRECISION,
    "measuredWattage" DOUBLE PRECISION,
    "powerReadingAreaId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartPlug" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceId" TEXT,

    CONSTRAINT "SmartPlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "wattage" DOUBLE PRECISION NOT NULL,
    "timeMeasured" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_id_key" ON "PowerReadingArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_externalId_key" ON "PowerReadingArea"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_key" ON "Device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SmartPlug_id_key" ON "SmartPlug"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SmartPlug_name_key" ON "SmartPlug"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SmartPlug_deviceId_key" ON "SmartPlug"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_id_key" ON "Measurement"("id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_powerReadingAreaId_fkey" FOREIGN KEY ("powerReadingAreaId") REFERENCES "PowerReadingArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartPlug" ADD CONSTRAINT "SmartPlug_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
