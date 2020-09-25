import { Test, TestingModule } from '@nestjs/testing';
import { DateScalar } from './date-scalar';

describe('DateScalar', () => {
    let provider: DateScalar;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DateScalar],
        }).compile();

        provider = module.get<DateScalar>(DateScalar);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
