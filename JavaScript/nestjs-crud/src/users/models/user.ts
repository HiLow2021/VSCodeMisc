import { UserDto } from '../dto/user.dto';
import { Gender } from '../enums/gender';

export class User {
    id: number | undefined;

    name: string;

    gender: Gender;

    birthday?: Date;

    constructor(dto: UserDto, id?: number) {
        this.id = id;
        this.name = dto.name;
        this.gender = dto.gender;
        this.birthday = dto.birthday;
    }
}
