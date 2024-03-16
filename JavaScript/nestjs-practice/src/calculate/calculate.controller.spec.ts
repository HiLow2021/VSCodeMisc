import { Test, TestingModule } from '@nestjs/testing';
import { CalculateController, Request } from './calculate.controller';
import { CalculateService } from './calculate.service';

describe('CalculateController', () => {
    let controller: CalculateController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CalculateController],
            providers: [CalculateService]
        }).compile();

        controller = module.get<CalculateController>(CalculateController);
    });

    it('add', () => {
        const dto = createDto(8, 2);

        expect(controller.add(dto)).toBe(10);
    });

    it('subtract', () => {
        const dto = createDto(8, 2);

        expect(controller.subtract(dto)).toBe(6);
    });

    it('multiply', () => {
        const dto = createDto(8, 2);

        expect(controller.multiply(dto)).toBe(16);
    });

    it('divide', () => {
        const dto = createDto(8, 2);

        expect(controller.divide(dto)).toBe(4);
    });

    function createDto(a: number, b: number): Request {
        return { a, b };
    }
});
