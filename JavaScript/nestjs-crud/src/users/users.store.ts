import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { convertToUser } from './converters/convert-to-users';
import { Gender } from './enums/gender';
import { User } from './models/user';

@Injectable()
export class UsersStore {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(skip?: number, take?: number): Promise<User[]> {
        const entities = await this.prisma.user.findMany({
            skip,
            take
        });

        return entities.map(convertToUser);
    }

    async findOne(id: number): Promise<User | undefined> {
        const entity = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!entity) {
            return undefined;
        }

        return convertToUser(entity);
    }

    async create(user: Readonly<User>): Promise<User> {
        const entity = await this.prisma.user.create({
            data: {
                id: undefined,
                name: user.name,
                age: user.age,
                gender_id: Gender.to(user.gender),
                birth_day: user.birthday
            }
        });

        return convertToUser(entity);
    }

    async update(user: Readonly<User>): Promise<User | undefined> {
        const entity = await this.prisma.user.update({
            data: {
                name: user.name,
                age: user.age,
                gender_id: Gender.to(user.gender),
                birth_day: user.birthday
            },
            where: {
                id: user.id
            }
        });

        return convertToUser(entity);
    }

    async delete(ids: readonly number[]): Promise<number> {
        const entities = await this.prisma.user.deleteMany({
            where: { id: { in: [...ids] } }
        });

        return entities.count;
    }
}
