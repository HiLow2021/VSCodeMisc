import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { result } from '../result';
import { CalculateService } from './calculate.service';

export type Request = {
    a: number;
    b: number;
};

@Controller('calculate')
export class CalculateController {
    constructor(private readonly calculateService: CalculateService) {}

    @Post('/add')
    @HttpCode(200)
    add(@Body() request: Request) {
        const dto = this.calculateService.add(request.a, request.b);

        return {
            answer: dto,
            result: result
        };
    }

    @Post('/subtract')
    @HttpCode(200)
    subtract(@Body() request: Request) {
        const dto = this.calculateService.subtract(request.a, request.b);

        return {
            answer: dto,
            result: result
        };
    }

    @Post('/multiply')
    @HttpCode(200)
    multiply(@Body() request: Request) {
        const dto = this.calculateService.multiply(request.a, request.b);

        return {
            answer: dto,
            result: result
        };
    }

    @Post('/divide')
    @HttpCode(200)
    divide(@Body() request: Request) {
        const dto = this.calculateService.divide(request.a, request.b);

        return {
            answer: dto,
            result: result
        };
    }
}
