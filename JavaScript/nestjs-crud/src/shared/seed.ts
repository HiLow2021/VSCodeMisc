import { PrismaService } from './prisma.service';

const users = [
    { id: 1, name: 'Alice', age: 20, gender_id: 1 },
    { id: 2, name: 'Betty', age: 30, gender_id: 1 },
    { id: 3, name: 'Carl', age: 40, gender_id: 0 }
];

export async function seed(prisma: PrismaService): Promise<void> {
    await prisma.user.deleteMany({});
    await prisma.user.createMany({ data: users });
}
