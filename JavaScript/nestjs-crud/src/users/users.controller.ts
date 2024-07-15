import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from './types/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get('/:id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.find(id);
    }
}
