import { user } from '@prisma/client';
import { Gender } from '../enums/gender';
import { User } from '../models/user';

export function convertToUser(user: Readonly<user>): User {
    return {
        id: user.id,
        name: user.name,
        age: user.age,
        gender: Gender.from(user.gender_id)
    };
}
