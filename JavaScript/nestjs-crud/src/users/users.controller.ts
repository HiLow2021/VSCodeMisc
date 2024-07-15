import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './models/user';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(new User(createUserDto));
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        if (id !== updateUserDto.id) {
            throw Error('Invalid Id');
        }

        return await this.usersService.update(new User(updateUserDto));
    }
}
