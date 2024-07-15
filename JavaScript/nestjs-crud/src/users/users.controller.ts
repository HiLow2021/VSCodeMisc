import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './dto';
import { User } from './models/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(new User(createUserDto));
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.update(new User(updateUserDto, id));
    }

    @Delete()
    async delete(@Body() deleteUserDto: DeleteUserDto): Promise<number> {
        return await this.usersService.delete(deleteUserDto.ids);
    }
}
