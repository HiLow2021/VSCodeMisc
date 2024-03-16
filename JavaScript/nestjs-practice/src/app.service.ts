import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from './shared/data';

export type User = {
    id: number;
    name: string;
    age: number;
};

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getUsers(): User[] {
        return users;
    }

    getUser(id: number): User | undefined {
        const user = users.find((x) => x.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    addUser(name: string, age: number): number {
        const id = users.length + 1;
        const newUser = { id, name, age };

        users.push(newUser);

        return id;
    }

    updateUser(user: User): void {
        const target = users.find((x) => x.id === user.id);
        if (!target) {
            throw new NotFoundException('User not found');
        }

        target.name = user.name;
        target.age = user.age;
    }

    deleteUser(ids: number[]): number {
        let deletedCount = 0;
        for (const id of ids) {
            const index = users.findIndex((x) => x.id === id);
            if (index >= 0) {
                users.splice(index, 1);
                deletedCount++;
            }
        }

        return deletedCount;
    }
}
