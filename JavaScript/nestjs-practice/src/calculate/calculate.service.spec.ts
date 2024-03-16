import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
    let service: CalculateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CalculateService]
        }).compile();

        service = module.get<CalculateService>(CalculateService);
    });

    it('add', () => {
        expect(service.add(8, 2)).toBe(10);
    });

    it('subtract', () => {
        expect(service.subtract(8, 2)).toBe(6);
    });

    it('multiply', () => {
        expect(service.multiply(8, 2)).toBe(16);
    });

    it('divide', () => {
        expect(service.divide(8, 2)).toBe(4);
    });
});
