import { Test, TestingModule } from '@nestjs/testing';
import { GetAddressService } from '../services/get.address.service';
import { CompanyAddressResolver } from './company-address.resolver';

describe('CompanyAddressResolver', () => {
    let resolver: CompanyAddressResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CompanyAddressResolver, GetAddressService],
        }).compile();

        resolver = module.get<CompanyAddressResolver>(CompanyAddressResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
