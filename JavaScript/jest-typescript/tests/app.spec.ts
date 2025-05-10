import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app, users } from '../src/app';

const request = supertest(app);

describe('API Test', () => {
    describe('GET', () => {
        test('Get All Users', async () => {
            const response = await request.get('/');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users);
        });

        test('Get User', async () => {
            const id = 2;

            const response = await request.get(`/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users[1]);
        });

        test('User not Found', async () => {
            const id = 999;

            const response = await request.get(`/${id}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'Not found' });
        });
    });

    describe('POST', () => {
        test('Add User', async () => {
            const body = { name: 'Cathy', age: 40 };

            const response = await request.post('/').send(body);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ id: 3 });
            expect(users).toHaveLength(3);
        });
    });

    describe('PUT', () => {
        test('Update User', async () => {
            const id = 1;
            const body = { name: 'Daisy', age: 10 };

            {
                const before = users.find((x) => x.id === id);

                expect(before).toEqual(users[0]);
            }

            const response = await request.put(`/${id}`).send(body);

            expect(response.statusCode).toBe(200);

            {
                const after = users.find((x) => x.id === id);

                expect(after).toEqual({ id, ...body });
            }
        });

        test('User not Found', async () => {
            const id = 999;
            const body = { name: 'Daisy', age: 10 };

            const response = await request.put(`/${id}`).send(body);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'Not found' });
        });
    });

    describe('DELETE', () => {
        test('Delete User', async () => {
            const ids = [1, 2];

            const response = await request.delete('/').send(ids);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ deletedCount: 2 });
            expect(users).toHaveLength(1);
        });
    });
});
