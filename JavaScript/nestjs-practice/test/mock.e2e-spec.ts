import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('Mock Test (e2e)', () => {
    let app: INestApplication;

    const appServiceMock = {
        getHello: jest.fn()
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(AppService)
            .useValue(appServiceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Hello Mock', async () => {
        appServiceMock.getHello.mockReturnValue('Hello Mock!');

        const response = await request(app.getHttpServer()).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello Mock!');
    });
});
