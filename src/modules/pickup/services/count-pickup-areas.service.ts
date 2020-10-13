import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryFiltersOptions } from 'src/modules/common/interfaces/IRepositoryFiltersOptions';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { PickUpArea } from '../entities/pickup-area.entity';
import { PickUpAreaActiveFilter } from '../filters/pickup-area.active.filter';
import { PickUpAreaCompaniesFilter } from '../filters/pickup-area.companies.filter';
import { PickUpAreaLocationFilter } from '../filters/pickup-area.location.filter';
import { IPickUpAreaRepository } from '../interfaces/pickup-area.repository.interface';

@Injectable()
export class CountPickUpAreasService {
    constructor(
        @Inject('IPickUpAreaRepository')
        private pickUpAreaRepository: IPickUpAreaRepository,
        private pickUpAreaLocationFilter: PickUpAreaLocationFilter,
        private pickUpAreaCompaniesFilter: PickUpAreaCompaniesFilter,
        private pickUpAreaActiveFilter: PickUpAreaActiveFilter,
    ) {}

    execute(filter?: PickUpAreaFilterDTO): Promise<number> {
        const options: IRepositoryFiltersOptions<PickUpArea, PickUpAreaFilterDTO> = {
            filter,
            filterHelpers: [this.pickUpAreaLocationFilter, this.pickUpAreaCompaniesFilter, this.pickUpAreaActiveFilter],
        };

        return this.pickUpAreaRepository.getCount(options);
    }
}
