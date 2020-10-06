import { Test, TestingModule } from '@nestjs/testing';
import { ListDeliveryAreasService } from './list-delivery-areas.service';

describe('ListDeliveryAreasService', () => {
  let service: ListDeliveryAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListDeliveryAreasService],
    }).compile();

    service = module.get<ListDeliveryAreasService>(ListDeliveryAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
