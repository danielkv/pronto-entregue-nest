import { Test, TestingModule } from '@nestjs/testing';
import { GetCompanyConfigService } from './get-company-config.service';

describe('GetCompanyConfigService', () => {
  let service: GetCompanyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCompanyConfigService],
    }).compile();

    service = module.get<GetCompanyConfigService>(GetCompanyConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
