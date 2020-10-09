import { Test, TestingModule } from '@nestjs/testing';
import { FilterHelper } from '../../common/helpers/filter.helper';
import { CountCompaniesService } from './count-companies.service';

describe('CountCompaniesService', () => {
    let service: CountCompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CountCompaniesService, FilterHelper],
        }).compile();

        service = module.get<CountCompaniesService>(CountCompaniesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
