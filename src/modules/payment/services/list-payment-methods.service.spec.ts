import { Test, TestingModule } from '@nestjs/testing';
import { ListPaymentMethodsService } from './list-payment-methods.service';

describe('ListPaymentMethodsService', () => {
  let service: ListPaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListPaymentMethodsService],
    }).compile();

    service = module.get<ListPaymentMethodsService>(ListPaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
