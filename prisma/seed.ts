import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
    try {
        const categories = [
            { name: 'Desktops' },
            { name: 'Laptops' },
            { name: 'TVs' },
            { name: 'Monitors' },
            { name: 'Computer Setups' },
            { name: 'Kitchen Appliances' },
            { name: 'Printers' },
            { name: 'Phones' },
            { name: 'Lamps' },
            { name: 'Air Conditioners' },
            { name: 'Personal Heaters/Coolers' },
            { name: 'Smart Home Devices' },
            { name: 'Electric Tables' },
            { name: 'Electric Car Chargers' },
        ];

        for (const category of categories) {
            const existingCategory = await prisma.deviceCategory.findFirst({ where: { name: category.name } });
            if (existingCategory) continue;
            await prisma.deviceCategory.create({ data: category });
        }

        console.log('Categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedCategories();