import { Gender } from '../enums/gender';

export class UserDto {
    name: string;

    gender: Gender;

    birthday?: Date;
}
