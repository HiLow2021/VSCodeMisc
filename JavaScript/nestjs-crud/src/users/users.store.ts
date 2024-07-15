import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { convertToUser } from './converters/convert-to-users';
import { Gender } from './enums/gender';
import { User } from './models/user';

@Injectable()
export class UsersStore {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(skip?: number, take?: number): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            skip,
            take
        });

        return users.map(convertToUser);
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        return convertToUser(user);
    }

    async create(user: Readonly<User>): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: {
                id: undefined,
                name: user.name,
                gender_id: Gender.to(user.gender),
                birth_day: user.birthday
            }
        });

        return convertToUser(newUser);
    }

    async update(user: Readonly<User>): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            data: {
                name: user.name,
                gender_id: Gender.to(user.gender),
                birth_day: user.birthday
            },
            where: {
                id: user.id
            }
        });

        return convertToUser(updatedUser);
    }

    async delete(ids: readonly number[]): Promise<number> {
        const users = await this.prisma.user.deleteMany({
            where: { id: { in: [...ids] } }
        });

        return users.count;
    }
}
