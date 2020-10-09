import { Test, TestingModule } from '@nestjs/testing';
import { ListCompaniesService } from './list-companies.service';

describe('CompanyService', () => {
    let service: ListCompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListCompaniesService],
        }).compile();

        service = module.get<ListCompaniesService>(ListCompaniesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
