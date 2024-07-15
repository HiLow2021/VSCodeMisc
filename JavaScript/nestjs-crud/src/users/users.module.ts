import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersStore } from './users.store';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersStore, PrismaService]
})
export class UsersModule {}
