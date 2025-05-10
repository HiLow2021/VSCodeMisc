import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [PingModule, UsersModule]
})
export class AppModule {}
