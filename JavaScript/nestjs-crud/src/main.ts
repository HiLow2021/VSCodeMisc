import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(`api/${config.version}`);

    await app.listen(3000);
}
bootstrap();
