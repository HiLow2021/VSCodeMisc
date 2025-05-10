import { Module } from '@nestjs/common';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';

@Module({
    controllers: [FunctionController],
    providers: [FunctionService]
})
export class FunctionModule {}
