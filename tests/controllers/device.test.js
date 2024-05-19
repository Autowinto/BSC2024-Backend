import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createServer } from '../../src/server';
import { prisma } from '../../src/prisma/dbClient';
describe('deviceController', () => {
    let server;
    beforeAll(async () => {
        server = await createServer();
    });
    afterAll(async () => {
        await server.close();
    });
    beforeEach(async () => {
        await prisma.device.create({
            data: {
                name: 'Test Device',
                description: 'Test Description',
                expectedWattage: 100,
                hoursActiveWeek: 10,
                categoryId: null,
            },
        });
    });
    afterEach(async () => {
        const area = await prisma.powerReadingArea.findFirst({
            where: {
                name: 'Test Area Device',
            },
        });
        if (area) {
            await prisma.deviceOnArea.deleteMany({
                where: {
                    areaId: area.id,
                },
            });
            await prisma.powerReadingArea.delete({
                where: {
                    id: area.id,
                },
            });
        }
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        if (device) {
            await prisma.measurement.deleteMany({
                where: {
                    deviceId: {
                        equals: device.id,
                    },
                },
            });
        }
        await prisma.device.deleteMany({
            where: {
                name: 'Test Device',
            },
        });
    });
    it('should get all devices', async () => {
        const response = await server.inject({ method: 'GET', url: '/devices' });
        expect(response.statusCode).toBe(200);
    });
    it('should get a device by ID', async () => {
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
            select: {
                id: true,
            },
        });
        if (!device)
            assert.fail('Device not found');
        const response = await server.inject({ method: 'GET', url: `/devices/${device.id}` });
        expect(response.statusCode).toBe(200);
    });
    it('should not find a device by invalid ID', async () => {
        const response = await server.inject({ method: 'GET', url: '/devices/bad-id' });
        expect(response.statusCode).toBe(404);
    });
    it('should create a new device', async () => {
        await prisma.device.delete({
            where: {
                name: 'Test Device',
            },
        });
        const response = await server.inject({
            method: 'POST',
            url: '/devices',
            payload: {
                name: 'Test Device',
                description: 'New Description',
                expectedWattage: 200,
                hoursActiveWeek: 10,
                categoryId: null,
            },
        });
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
                description: 'New Description',
                expectedWattage: 200,
            },
        });
        expect(device).toBeTruthy();
        expect(response.statusCode).toBe(201);
    });
    it('should update a device', async () => {
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
            select: {
                id: true,
            },
        });
        if (!device)
            assert.fail('Device not found');
        const response = await server.inject({
            method: 'PUT',
            url: '/devices',
            payload: {
                id: device.id,
                name: 'Test Device',
                description: 'Updated Description',
                expectedWattage: 300,
                measuredWattage: null,
                hoursActiveWeek: 10,
                categoryId: null,
            },
        });
        const updatedDevice = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
                description: 'Updated Description',
                expectedWattage: 300,
            },
        });
        expect(updatedDevice).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });
    it('should not update a device with invalid ID', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: '/devices',
            payload: {
                id: 'bad-id',
                name: 'Test Device',
                description: 'Updated Description',
                expectedWattage: 300,
                measuredWattage: null,
                hoursActiveWeek: 10,
                categoryId: null,
            },
        });
        expect(response.statusCode).toBe(404);
    });
    it('should return 400 on invalid request but correct id', async () => {
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
            select: {
                id: true,
            },
        });
        if (!device)
            assert.fail('Device not found');
        const response = await server.inject({
            method: 'PUT',
            url: '/devices',
            payload: {
                id: device.id,
                name: 'Test Device',
                expectedWattage: 300,
                measuredWattage: 'invalid',
                hoursActiveWeek: 10,
                categoryId: null,
            },
        });
        expect(response.statusCode).toBe(400);
        await prisma.device.delete({
            where: {
                id: device.id,
            },
        });
    });
    it('should delete a device', async () => {
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        if (!device)
            assert.fail('Device not found');
        const response = await server.inject({
            method: 'DELETE',
            url: `/devices/${device.id}`,
        });
        const deletedDevice = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        expect(response.statusCode).toBe(200);
        expect(deletedDevice).toBeFalsy();
    });
    it('should not delete a device with invalid ID', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: '/devices/bad-id',
        });
        expect(response.statusCode).toBe(404);
    });
    it('should delete a device connected to an area', async () => {
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        if (!device)
            assert.fail('Device not found');
        await prisma.powerReadingArea.create({
            data: {
                name: 'Test Area Device',
                externalId: 'test-area',
            },
        });
        const area = await prisma.powerReadingArea.findFirst({
            where: {
                name: 'Test Area Device',
            },
        });
        if (!area)
            assert.fail('Area not found');
        await prisma.deviceOnArea.create({
            data: {
                deviceId: device.id,
                areaId: area.id,
                count: 1,
            },
        });
        const response = await server.inject({
            method: 'DELETE',
            url: `/devices/${device.id}`,
        });
        const deletedDevice = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        const deletedDeviceOnArea = await prisma.deviceOnArea.findFirst({
            where: {
                deviceId: device.id,
                areaId: area.id,
            },
        });
        expect(response.statusCode).toBe(200);
        expect(deletedDeviceOnArea).toBeFalsy();
        expect(deletedDevice).toBeFalsy();
    });
    it('should get all measurements for a device', async () => {
        const measurements = 10;
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        if (!device)
            assert.fail('Device not found');
        for (let i = 0; i < measurements; i++) {
            await prisma.measurement.create({
                data: {
                    deviceId: device.id,
                    wattage: 100 + i,
                    timeMeasured: new Date(),
                },
            });
        }
        if (!device)
            assert.fail('Device not found');
        const response = await server.inject({
            method: 'GET',
            url: `/devices/${device.id}/measurements`,
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toBeInstanceOf(Array);
        expect(response.json().length).toBe(measurements);
    });
    it('should not get measurements for a device with invalid ID', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/devices/bad-id/measurements',
        });
        expect(response.statusCode).toBe(404);
    });
    it('should update the measured wattage of a device', async () => {
        const measurements = 10;
        const device = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        if (!device)
            assert.fail('Device not found');
        for (let i = 0; i < measurements; i++) {
            await prisma.measurement.create({
                data: {
                    deviceId: device.id,
                    wattage: 100 + i,
                    timeMeasured: new Date(),
                },
            });
        }
        const updatedDevice = await prisma.device.findFirst({
            where: {
                name: 'Test Device',
            },
        });
        const expectedWattage = calculateExpectedWattage();
        function calculateExpectedWattage() {
            let sum = 0;
            for (let i = 0; i < measurements; i++)
                sum += 100 + i;
            return sum / measurements;
        }
        if (!updatedDevice)
            assert.fail('Updated device not found');
        expect(updatedDevice.measuredWattage).toBe(expectedWattage);
    });
    it('should not update the measured wattage of a device with invalid ID', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: '/devices/updateMeasuredWattage',
            payload: {
                id: 'bad-id',
            },
        });
        expect(response.statusCode).toBe(404);
    });
});
//# sourceMappingURL=device.test.js.map