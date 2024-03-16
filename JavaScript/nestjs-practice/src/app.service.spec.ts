import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { users } from './shared/data';

describe('FunctionService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService]
        }).compile();

        service = module.get<AppService>(AppService);
    });

    describe('Root', () => {
        it('should return "Hello World!"', () => {
            expect(service.getHello()).toBe('Hello World!');
        });
    });

    describe('GET', () => {
        it('Get All Users', async () => {
            const gotUsers = service.getUsers();

            expect(gotUsers).toEqual(users);
        });

        it('Get User', async () => {
            const id = 2;
            const user = service.getUser(id);

            expect(user).toEqual(users[1]);
        });
    });

    describe('POST', () => {
        it('Add User', async () => {
            const name = 'Cathy';
            const age = 40;

            const newId = service.addUser(name, age);

            expect(newId).toBe(3);
        });
    });

    describe('PUT', () => {
        it('Update User', async () => {
            const target = { id: 1, name: 'Daisy', age: 10 };

            {
                const before = users.find((x) => x.id === target.id);

                expect(before).toEqual(users[0]);
            }

            service.updateUser(target);

            {
                const after = users.find((x) => x.id === target.id);

                expect(after).toEqual(target);
            }
        });
    });

    describe('DELETE', () => {
        it('Delete User', async () => {
            const ids = [1, 2];

            const deletedCount = service.deleteUser(ids);

            expect(deletedCount).toBe(2);
            expect(users).toHaveLength(1);
        });
    });
});
