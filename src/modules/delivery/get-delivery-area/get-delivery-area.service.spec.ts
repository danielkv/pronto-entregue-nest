import { Test, TestingModule } from '@nestjs/testing';
import { GetDeliveryAreaService } from './get-delivery-area.service';

describe('GetDeliveryAreaService', () => {
  let service: GetDeliveryAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDeliveryAreaService],
    }).compile();

    service = module.get<GetDeliveryAreaService>(GetDeliveryAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
