import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/shared/prisma.service';
import { seed } from 'src/shared/seed';
import { Gender } from './enums/gender';
import { User } from './models/user';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule]
        }).compile();

        controller = module.get<UsersController>(UsersController);

        const prisma = module.get<PrismaService>(PrismaService);
        await seed(prisma);
    });

    describe('GET', () => {
        it('Get All Users', async () => {
            const query = { skip: undefined, take: undefined };
            const users = await controller.findAll(query);

            expect(users).toEqual([
                { id: 1, name: 'Alice', age: 20, gender: Gender.Female },
                { id: 2, name: 'Betty', age: 30, gender: Gender.Female },
                { id: 3, name: 'Carl', age: 40, gender: Gender.Male }
            ]);
        });

        it('Get Users With Skip & Take', async () => {
            const query = { skip: 1, take: 1 };
            const users = await controller.findAll(query);

            expect(users).toEqual([{ id: 2, name: 'Betty', age: 30, gender: Gender.Female }]);
        });

        it('Get User', async () => {
            const id = 2;
            const user = await controller.findOne(id);

            expect(user).toEqual({ id: 2, name: 'Betty', age: 30, gender: Gender.Female });
        });

        it('User Not Found', async () => {
            const id = 999;

            await expect(async () => await controller.findOne(id)).rejects.toThrow('User Not Found');
        });
    });

    describe('POST', () => {
        it('Create User', async () => {
            const user = createUser(undefined, 'Daisy', 10, Gender.Female);

            const newUser = await controller.create(user);

            expect(newUser).toEqual({ ...user, id: expect.anything() } as User);
        });
    });

    describe('PUT', () => {
        it('Update User', async () => {
            const id = 1;
            const user = createUser(id, 'Adam', 30, Gender.Male);

            {
                const before = await controller.findOne(id);

                expect(before).toEqual({ id: 1, name: 'Alice', age: 20, gender: Gender.Female });
            }

            await controller.update(id, user);

            {
                const after = await controller.findOne(id);

                expect(after).toEqual(user);
            }
        });

        it('User Not Found', async () => {
            const id = 999;
            const user = createUser(id, 'Adam', 30, Gender.Male);

            await expect(async () => await controller.update(id, user)).rejects.toThrow('User Not Found');
        });
    });

    describe('DELETE', () => {
        it('Delete Multiple Users', async () => {
            const requestBody = { ids: [1, 2] };

            const deletedCount = await controller.delete(requestBody);

            expect(deletedCount).toBe(2);
        });

        it('Not Exist Users', async () => {
            const requestBody = { ids: [998, 999] };

            const deletedCount = await controller.delete(requestBody);

            expect(deletedCount).toBe(0);
        });
    });

    function createUser(id: number | undefined, name: string, age: number, gender: Gender, birthday?: Date): User {
        return {
            id,
            name,
            age,
            gender,
            birthday
        };
    }
});
