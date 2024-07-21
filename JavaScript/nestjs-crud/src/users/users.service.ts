import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user';
import { UsersStore } from './users.store';

@Injectable()
export class UsersService {
    constructor(private readonly usersStore: UsersStore) {}

    async findAll(skip?: number, take?: number): Promise<User[]> {
        return await this.usersStore.findAll(skip, take);
    }

    async findOne(id: number): Promise<User | undefined> {
        const user = await this.usersStore.findOne(id);
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(user: Readonly<User>): Promise<User> {
        return this.usersStore.create(user);
    }

    async update(user: Readonly<User>): Promise<User> {
        const found = await this.usersStore.findOne(user.id);
        if (!found) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }

        return await this.usersStore.update(user);
    }

    async delete(ids: readonly number[]): Promise<number> {
        return this.usersStore.delete(ids);
    }
}
