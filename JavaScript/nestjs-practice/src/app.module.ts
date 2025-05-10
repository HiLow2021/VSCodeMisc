import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FunctionModule } from './function/function.module';

@Module({
    imports: [FunctionModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
