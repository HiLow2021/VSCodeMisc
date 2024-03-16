import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { users } from './shared/data';

describe('AppController', () => {
    let controller: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        controller = app.get<AppController>(AppController);
    });

    describe('Root', () => {
        it('should return "Hello World!"', () => {
            expect(controller.getHello()).toBe('Hello World!');
        });
    });

    describe('GET', () => {
        it('Get All Users', async () => {
            const gotUsers = controller.getUsers();

            expect(gotUsers).toEqual(users);
        });

        it('Get User', async () => {
            const id = 2;
            const user = controller.getUser(id);

            expect(user).toEqual(users[1]);
        });

        it('User not Found', async () => {
            const id = 999;

            try {
                controller.getUser(id);
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('POST', () => {
        it('Add User', async () => {
            const body = { name: 'Cathy', age: 40 };

            const user = controller.postUser(body);

            expect(user).toEqual({ id: 3 });
        });
    });

    describe('PUT', () => {
        it('Update User', async () => {
            const id = 1;
            const body = { name: 'Daisy', age: 10 };

            {
                const before = users.find((x) => x.id === id);

                expect(before).toEqual(users[0]);
            }

            controller.putUser(id, body);

            {
                const after = users.find((x) => x.id === id);

                expect(after).toEqual({ id, ...body });
            }
        });

        it('User not Found', async () => {
            const id = 999;
            const body = { name: 'Daisy', age: 10 };

            try {
                controller.putUser(id, body);
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('DELETE', () => {
        it('Delete User', async () => {
            const ids = [1, 2];

            const deletedCount = controller.deleteUser(ids);

            expect(deletedCount).toEqual({ deletedCount: 2 });
            expect(users).toHaveLength(1);
        });
    });
});
