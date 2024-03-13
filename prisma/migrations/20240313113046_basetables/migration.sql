-- CreateTable
CREATE TABLE "Appliance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "expectedWattage" DECIMAL(65,30),
    "measuringPointId" TEXT,

    CONSTRAINT "Appliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasuringPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meterId" INTEGER NOT NULL,

    CONSTRAINT "MeasuringPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "wattage" DECIMAL(65,30) NOT NULL,
    "timeMeasured" TIMESTAMP(3) NOT NULL,
    "measuringPointId" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appliance" ADD CONSTRAINT "Appliance_measuringPointId_fkey" FOREIGN KEY ("measuringPointId") REFERENCES "MeasuringPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasuringPoint" ADD CONSTRAINT "MeasuringPoint_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "Meter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_measuringPointId_fkey" FOREIGN KEY ("measuringPointId") REFERENCES "MeasuringPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;