-- CreateTable
CREATE TABLE "PowerReadingArea" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PowerReadingArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "expectedWattage" DOUBLE PRECISION,
    "smartPlugId" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartPlug" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "powerReadingAreaId" INTEGER NOT NULL,

    CONSTRAINT "SmartPlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartPlugMeasurement" (
    "id" SERIAL NOT NULL,
    "wattage" DECIMAL(65,30) NOT NULL,
    "timeMeasured" TIMESTAMP(3) NOT NULL,
    "smartPlugId" TEXT NOT NULL,

    CONSTRAINT "SmartPlugMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PowerReadingArea_externalId_key" ON "PowerReadingArea"("externalId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_smartPlugId_fkey" FOREIGN KEY ("smartPlugId") REFERENCES "SmartPlug"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartPlug" ADD CONSTRAINT "SmartPlug_powerReadingAreaId_fkey" FOREIGN KEY ("powerReadingAreaId") REFERENCES "PowerReadingArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartPlugMeasurement" ADD CONSTRAINT "SmartPlugMeasurement_smartPlugId_fkey" FOREIGN KEY ("smartPlugId") REFERENCES "SmartPlug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
