import { Test, TestingModule } from '@nestjs/testing';
import { GeoPointHelper } from './geo-point-helper';

describe('GeoPointHelper', () => {
  let provider: GeoPointHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoPointHelper],
    }).compile();

    provider = module.get<GeoPointHelper>(GeoPointHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
