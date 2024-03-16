import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { FunctionService } from './function.service';

export type Request = {
    a: number;
    b: number;
};

@Controller('function')
export class FunctionController {
    constructor(private readonly functionService: FunctionService) {}

    @Post('/add')
    @HttpCode(200)
    add(@Body() request: Request) {
        return this.functionService.add(request.a, request.b);
    }

    @Post('/sub')
    @HttpCode(200)
    sub(@Body() request: Request) {
        return this.functionService.sub(request.a, request.b);
    }

    @Post('/mul')
    @HttpCode(200)
    mul(@Body() request: Request) {
        return this.functionService.mul(request.a, request.b);
    }

    @Post('/div')
    @HttpCode(200)
    div(@Body() request: Request) {
        return this.functionService.div(request.a, request.b);
    }
}
