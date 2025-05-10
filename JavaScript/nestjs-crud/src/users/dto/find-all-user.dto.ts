import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllUserDto {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    skip?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    take?: number;
}
