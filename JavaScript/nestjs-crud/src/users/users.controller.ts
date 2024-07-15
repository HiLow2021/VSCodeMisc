import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user';
import { UserDto } from './dto/user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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
    async create(@Body() userDto: UserDto): Promise<User> {
        return await this.usersService.create(new User(userDto));
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto): Promise<User> {
        return await this.usersService.update(new User(userDto, id));
    }

    @Delete()
    async delete(@Body() deleteUserDto: DeleteUserDto): Promise<number> {
        return await this.usersService.delete(deleteUserDto.ids);
    }
}
