import { Test, TestingModule } from '@nestjs/testing';
import { GeoPointScalar } from './geo-point-scalar';

describe('GeoPointScalar', () => {
  let provider: GeoPointScalar;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoPointScalar],
    }).compile();

    provider = module.get<GeoPointScalar>(GeoPointScalar);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
