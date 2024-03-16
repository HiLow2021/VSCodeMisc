import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

export type PostRequest = {
    name: string;
    age: number;
};

export type PutRequest = {
    name: string;
    age: number;
};

export type DeleteRequest = {
    ids: number[];
};

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/ping')
    getPing(): string {
        return this.appService.ping();
    }

    @Get('/users')
    getUsers() {
        const users = this.appService.getUsers();

        return users;
    }

    @Get('/user/:id')
    getUser(@Param('id') id: string) {
        const user = this.appService.getUser(Number(id));

        return user;
    }

    @Post('/user')
    postUser(@Body() request: PostRequest) {
        const id = this.appService.addUser(request.name, request.age);

        return id;
    }

    @Put('/user/:id')
    putUser(@Param('id') id: string, @Body() request: PutRequest) {
        const user = { id: Number(id), name: request.name, age: request.age };

        this.appService.updateUser(user);
    }

    @Delete('/user')
    deleteUser(@Body() request: DeleteRequest) {
        const deletedCount = this.appService.deleteUser(request.ids);

        return deletedCount;
    }
}
