import { Injectable } from '@nestjs/common';
import { User } from './types/user';
import { UsersStore } from './users.store';

@Injectable()
export class UsersService {
    constructor(private readonly usersStore: UsersStore) {}

    async findAll(skip?: number, take?: number): Promise<User[]> {
        return await this.usersStore.findAll({ skip, take });
    }

    async find(id: number): Promise<User | undefined> {
        return await this.usersStore.find({ id });
    }
}
