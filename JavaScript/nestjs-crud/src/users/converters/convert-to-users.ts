import { user } from '@prisma/client';
import { User } from '../types/user';
import { Gender } from '../enums/gender';

export function convertToUser(user: Readonly<user>): User {
    return {
        id: user.id,
        name: user.name,
        gender: Gender.from(user.gender_id)
    };
}
