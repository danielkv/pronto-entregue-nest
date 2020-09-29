import { Test, TestingModule } from '@nestjs/testing';
import { FilterHelper } from './filter.helper';

describe('Filter', () => {
    let provider: FilterHelper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FilterHelper],
        }).compile();

        provider = module.get<FilterHelper>(FilterHelper);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
