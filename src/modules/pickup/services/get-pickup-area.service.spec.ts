import { Test, TestingModule } from '@nestjs/testing';
import { GetPickUpAreaService } from './get-pickup-area.service';

describe('GetPickUpAreaService', () => {
    let service: GetPickUpAreaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetPickUpAreaService],
        }).compile();

        service = module.get<GetPickUpAreaService>(GetPickUpAreaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
