import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'src/calculate/calculate.controller';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CalculateController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('add (Post)', async () => {
        const requestBody = createRequestBody(8, 2);
        const response = await request(app.getHttpServer()).post('/calculate/add').send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body.answer).toBe(10);
    });

    it('subtract (Post)', async () => {
        const requestBody = createRequestBody(8, 2);
        const response = await request(app.getHttpServer()).post('/calculate/subtract').send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body.answer).toBe(6);
    });

    it('multiply (Post)', async () => {
        const requestBody = createRequestBody(8, 2);
        const response = await request(app.getHttpServer()).post('/calculate/multiply').send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body.answer).toBe(16);
    });

    it('divide (Post)', async () => {
        const requestBody = createRequestBody(8, 2);
        const response = await request(app.getHttpServer()).post('/calculate/divide').send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body.answer).toBe(4);
    });

    function createRequestBody(a: number, b: number): Request {
        return { a, b };
    }
});
