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
        const answer = this.functionService.add(request.a, request.b);

        return { answer };
    }

    @Post('/sub')
    @HttpCode(200)
    sub(@Body() request: Request) {
        const answer = this.functionService.sub(request.a, request.b);

        return { answer };
    }

    @Post('/mul')
    @HttpCode(200)
    mul(@Body() request: Request) {
        const answer = this.functionService.mul(request.a, request.b);

        return { answer };
    }

    @Post('/div')
    @HttpCode(200)
    div(@Body() request: Request) {
        const answer = this.functionService.div(request.a, request.b);

        return { answer };
    }
}
