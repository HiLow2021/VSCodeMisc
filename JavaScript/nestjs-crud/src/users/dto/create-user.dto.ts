import { Gender } from '../enums/gender';

export class CreateUserDto {
    name: string;

    gender: Gender;

    birthday?: Date;
}
