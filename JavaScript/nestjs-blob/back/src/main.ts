import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json({ limit: '50mb' }));

    await app.listen(5000);
}
bootstrap();
