import { Test, TestingModule } from '@nestjs/testing';
import { FunctionController, Request } from './function.controller';
import { FunctionService } from './function.service';

describe('FunctionController', () => {
    let controller: FunctionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FunctionController],
            providers: [FunctionService]
        }).compile();

        controller = module.get<FunctionController>(FunctionController);
    });

    it('add', () => {
        const dto = createDto(8, 2);

        expect(controller.add(dto)).toEqual({ answer: 10 });
    });

    it('subtract', () => {
        const dto = createDto(8, 2);

        expect(controller.sub(dto)).toEqual({ answer: 6 });
    });

    it('multiply', () => {
        const dto = createDto(8, 2);

        expect(controller.mul(dto)).toEqual({ answer: 16 });
    });

    it('divide', () => {
        const dto = createDto(8, 2);

        expect(controller.div(dto)).toEqual({ answer: 4 });
    });

    function createDto(a: number, b: number): Request {
        return { a, b };
    }
});
