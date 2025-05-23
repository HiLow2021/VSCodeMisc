import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionService {
    add(a: number, b: number): number {
        return a + b;
    }

    sub(a: number, b: number): number {
        return a - b;
    }

    mul(a: number, b: number): number {
        return a * b;
    }

    div(a: number, b: number): number {
        return a / b;
    }
}
