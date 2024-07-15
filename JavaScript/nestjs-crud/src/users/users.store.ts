import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { convertToUser } from './converters/convert-to-users';
import { Gender } from './enums/gender';
import { User } from './models/user';

@Injectable()
export class UsersStore {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.userWhereUniqueInput;
        where?: Prisma.userWhereInput;
        orderBy?: Prisma.userOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        const users = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });

        return users.map(convertToUser);
    }

    async findOne(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
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
