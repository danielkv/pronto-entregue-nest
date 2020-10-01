import { Test, TestingModule } from '@nestjs/testing';
import { CompanyFilterHelper } from './company-filter-helper';

describe('CompanyFilterHelper', () => {
  let provider: CompanyFilterHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyFilterHelper],
    }).compile();

    provider = module.get<CompanyFilterHelper>(CompanyFilterHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
