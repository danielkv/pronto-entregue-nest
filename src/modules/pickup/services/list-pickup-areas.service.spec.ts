import { Test, TestingModule } from '@nestjs/testing';
import { ListPickUpAreasService } from './list-pickup-areas.service';

describe('ListPickUpAreasService', () => {
    let service: ListPickUpAreasService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListPickUpAreasService],
        }).compile();

        service = module.get<ListPickUpAreasService>(ListPickUpAreasService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
