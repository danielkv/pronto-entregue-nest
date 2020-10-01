import { Test, TestingModule } from '@nestjs/testing';
import { GetCompanyService } from './get-company.service';

describe('GetCompanyServiceService', () => {
    let service: GetCompanyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetCompanyService],
        }).compile();

        service = module.get<GetCompanyService>(GetCompanyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
