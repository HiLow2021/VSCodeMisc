import { Gender } from '../enums/gender';

export class CreateUserDto {
    name: string;

    age: number;

    gender: Gender;

    birthday?: Date;
}
