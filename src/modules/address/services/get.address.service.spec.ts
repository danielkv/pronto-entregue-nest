import { Test, TestingModule } from '@nestjs/testing';
import { GetAddressService } from './get.address.service';

describe('AddressService', () => {
    let service: GetAddressService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetAddressService],
        }).compile();

        service = module.get<GetAddressService>(GetAddressService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
