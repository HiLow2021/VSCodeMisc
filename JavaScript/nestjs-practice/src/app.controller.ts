import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { result } from './shared/result';

export type PostRequest = {
    name: string;
    age: number;
};

export type PutRequest = {
    id: number;
    name: string;
    age: number;
};

export type DeleteRequest = {
    ids: number[];
};

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getPing(): string {
        return this.appService.ping();
    }

    @Get()
    getUsers() {
        const dto = this.appService.getUsers();

        return {
            users: dto,
            result: result
        };
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        const dto = this.appService.getUser(id);

        return {
            user: dto,
            result: result
        };
    }

    @Post()
    postUser(@Body() request: PostRequest) {
        const id = this.appService.addUser(request.name, request.age);

        return {
            id,
            result: result
        };
    }

    @Put()
    putUser(@Body() request: PutRequest) {
        this.appService.updateUser(request);

        return {
            result: result
        };
    }

    @Delete()
    deleteUser(@Body() request: DeleteRequest) {
        const deletedCount = this.appService.deleteUser(request.ids);

        return {
            deletedCount,
            result: result
        };
    }
}
