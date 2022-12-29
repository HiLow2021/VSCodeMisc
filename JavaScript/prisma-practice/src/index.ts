import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const zodiacs = await prisma.t_zodiac.findMany();
    console.log(zodiacs);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
