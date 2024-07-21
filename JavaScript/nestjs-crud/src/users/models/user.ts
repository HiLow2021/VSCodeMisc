import { CreateUserDto, UpdateUserDto } from '../dto';
import { Gender } from '../enums/gender';

export class User {
    id: number | undefined;

    name: string;

    age: number;

    gender: Gender;

    birthday?: Date;

    constructor(id: number | undefined, dto: Readonly<CreateUserDto | UpdateUserDto>) {
        this.id = id;
        this.name = dto.name;
        this.age = dto.age;
        this.gender = dto.gender;
        this.birthday = dto.birthday;
    }
}
