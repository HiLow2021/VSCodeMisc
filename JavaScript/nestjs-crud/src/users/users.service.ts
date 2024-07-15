import { Injectable } from '@nestjs/common';
import { UsersStore } from './users.store';
import { User } from './models/user';

@Injectable()
export class UsersService {
    constructor(private readonly usersStore: UsersStore) {}

    async findAll(skip?: number, take?: number): Promise<User[]> {
        return await this.usersStore.findAll({ skip, take });
    }

    async find(id: number): Promise<User | undefined> {
        return await this.usersStore.find({ id });
    }

    async create(user: Readonly<User>): Promise<User> {
        return this.usersStore.create(user);
    }

    async update(user: Readonly<User>): Promise<User> {
        return this.usersStore.update(user);
    }
}
