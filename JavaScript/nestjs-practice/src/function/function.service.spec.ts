import { Test, TestingModule } from '@nestjs/testing';
import { FunctionService } from './function.service';

describe('FunctionService', () => {
    let service: FunctionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FunctionService]
        }).compile();

        service = module.get<FunctionService>(FunctionService);
    });

    it('add', () => {
        expect(service.add(8, 2)).toBe(10);
    });

    it('subtract', () => {
        expect(service.sub(8, 2)).toBe(6);
    });

    it('multiply', () => {
        expect(service.mul(8, 2)).toBe(16);
    });

    it('divide', () => {
        expect(service.div(8, 2)).toBe(4);
    });
});
