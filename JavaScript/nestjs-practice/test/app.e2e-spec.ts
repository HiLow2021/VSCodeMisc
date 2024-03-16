import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { users } from '../src/shared/data';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('GET', () => {
        it('Get All Users', async () => {
            const response = await request(app.getHttpServer()).get('/users');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users);
        });

        it('Get User', async () => {
            const id = 2;

            const response = await request(app.getHttpServer()).get(`/user/:${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users[1]);
        });

        it('User not Found', async () => {
            const id = 999;

            const response = await request(app.getHttpServer()).get(`/user/:${id}`);

            expect(response.statusCode).toBe(404);
        });
    });

    describe('POST', () => {
        it('Add User', async () => {
            const body = { name: 'Cathy', age: 40 };

            const response = await request(app.getHttpServer()).post('/user').send(body);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ id: 3 });
            expect(users).toHaveLength(3);
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

            const response = await request(app.getHttpServer()).put(`/user/:${id}`).send(body);

            expect(response.statusCode).toBe(200);

            {
                const after = users.find((x) => x.id === id);

                expect(after).toEqual({ id, ...body });
            }
        });

        it('User not Found', async () => {
            const id = 999;
            const body = { name: 'Daisy', age: 10 };

            const response = await request(app.getHttpServer()).put(`/user:${id}`).send(body);

            expect(response.statusCode).toBe(404);
        });
    });

    describe('DELETE', () => {
        it('Delete User', async () => {
            const ids = [1, 2];

            const response = await request(app.getHttpServer()).delete('/user').send(ids);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ deletedCount: 2 });
            expect(users).toHaveLength(1);
        });
    });
});
