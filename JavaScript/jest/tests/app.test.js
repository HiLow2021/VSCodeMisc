const supertest = require('supertest');
const { app, users } = require('../app.js');

const request = supertest(app);

describe('API Test', () => {
    describe('GET', () => {
        test('Get All Users', async () => {
            const response = await request.get('/');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users);
        });

        test('Get User', async () => {
            const query = { name: 'Betty' };

            const response = await request.get('/').query(query);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(users[1]);
        });

        test('User not Found', async () => {
            const query = { name: 'Daisy' };

            const response = await request.get('/').query(query);

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
            const body = { name: 'Alice', age: 10 };

            // before
            {
                const user = users.find((x) => x.name === body.name);

                expect(user.age).toBe(20);
            }

            const response = await request.put('/').send(body);

            expect(response.statusCode).toBe(200);

            // after
            {
                const user = users.find((x) => x.name === body.name);

                expect(user.age).toBe(10);
            }
        });

        test('User not Found', async () => {
            const body = { name: 'Daisy', age: 10 };

            const response = await request.put('/').send(body);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'Not found' });
        });
    });

    describe('DELETE', () => {
        test('Delete User', async () => {
            const id = 1;

            const response = await request.delete(`/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ deletedCount: 1 });
            expect(users).toHaveLength(2);
        });
    });
});
