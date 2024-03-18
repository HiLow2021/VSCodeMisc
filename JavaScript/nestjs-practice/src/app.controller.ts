import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

export type Request = {
    name: string;
    age: number;
};

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/users')
    getUsers() {
        const users = this.appService.getUsers();

        return users;
    }

    @Get('/user/:id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        const user = this.appService.getUser(Number(id));

        return user;
    }

    @Post('/user')
    postUser(@Body() request: Readonly<Request>) {
        const id = this.appService.addUser(request.name, request.age);

        return { id };
    }

    @Put('/user/:id')
    putUser(@Param('id', ParseIntPipe) id: number, @Body() request: Readonly<Request>) {
        const user = { id: Number(id), name: request.name, age: request.age };

        this.appService.updateUser(user);
    }

    @Delete('/users')
    deleteUser(@Body() ids: readonly number[]) {
        const deletedCount = this.appService.deleteUser(ids);

        return { deletedCount };
    }
}
