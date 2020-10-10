import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodCompanyResolver } from './payment-method.company.resolver';

describe('PaymentMethodcompanyResolver', () => {
    let resolver: PaymentMethodCompanyResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PaymentMethodCompanyResolver],
        }).compile();

        resolver = module.get<PaymentMethodCompanyResolver>(PaymentMethodCompanyResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
