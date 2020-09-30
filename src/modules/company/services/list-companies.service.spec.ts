import { Test, TestingModule } from '@nestjs/testing';
import { FilterHelper } from '../../common/helpers/filter.helper';
import { ListCompanyService } from './list-companies.service';

describe('CompanyService', () => {
    let service: ListCompanyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListCompanyService, FilterHelper],
        }).compile();

        service = module.get<ListCompanyService>(ListCompanyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
