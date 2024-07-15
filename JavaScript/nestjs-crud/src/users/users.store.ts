import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { convertToUser } from './converters/convert-to-users';
import { User } from './types/user';

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

    async find(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });

        return convertToUser(user);
    }
}
