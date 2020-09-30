import { Test, TestingModule } from '@nestjs/testing';
import { Company } from '../entities/company.entity';
import { FilterSearch } from './filter.search';

describe('Filter', () => {
    let provider: FilterSearch<Company>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FilterSearch],
        }).compile();

        provider = module.get<FilterSearch<Company>>(FilterSearch);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
