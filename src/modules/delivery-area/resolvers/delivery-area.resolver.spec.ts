import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryAreaResolver } from './delivery-area.resolver';

describe('DeliveryAreaResolver', () => {
  let resolver: DeliveryAreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryAreaResolver],
    }).compile();

    resolver = module.get<DeliveryAreaResolver>(DeliveryAreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
