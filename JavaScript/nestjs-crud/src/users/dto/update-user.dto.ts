import { Gender } from '../enums/gender';

export class UpdateUserDto {
    id: number;

    name: string;

    gender: Gender;

    birthday?: Date;
}
