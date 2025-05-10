const { PrismaClient } = require('@prisma/client');
const { invoices, customers, revenue, users } = require('./data.js');

const prisma = new PrismaClient();

async function seed() {
    try {
        await prisma.users.deleteMany({});
        await prisma.users.createMany({
            data: users
        });

        await prisma.customers.deleteMany({});
        await prisma.customers.createMany({
            data: customers
        });

        await prisma.invoices.deleteMany({});
        await prisma.invoices.createMany({
            data: invoices
        });

        await prisma.revenue.deleteMany({});
        await prisma.revenue.createMany({
            data: revenue
        });

        console.log('データの挿入が完了しました。');
    } catch (error) {
        console.error('エラーが発生しました:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
