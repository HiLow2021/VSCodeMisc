import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Gender } from '../enums/gender';

export class User {
    id: number | undefined;

    name: string;

    gender: Gender;

    birthday?: Date;

    constructor(dto: Readonly<CreateUserDto | UpdateUserDto>, id?: number) {
        this.id = id;
        this.name = dto.name;
        this.gender = dto.gender;
        this.birthday = dto.birthday;
    }
}
