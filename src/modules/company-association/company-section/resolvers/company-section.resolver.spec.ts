import { Test, TestingModule } from '@nestjs/testing';
import { CompanySectionResolver } from './company-section.resolver';

describe('CompanySectionResolver', () => {
  let resolver: CompanySectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySectionResolver],
    }).compile();

    resolver = module.get<CompanySectionResolver>(CompanySectionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
