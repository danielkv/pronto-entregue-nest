import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryFiltersOptions } from 'src/modules/common/interfaces/IRepositoryFiltersOptions';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaActiveFilter } from '../filters/delivery.area.active.filter';
import { DeliveryAreaCompaniesFilter } from '../filters/delivery.area.companies.filter';
import { DeliveryAreaLocationFilter } from '../filters/delivery.area.location.filter';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';

@Injectable()
export class CountDeliveryAreasService {
    constructor(
        @Inject('IDeliveryAreaRepository')
        private deliveryAreaRepository: IDeliveryAreaRepository,
        private deliveryAreaLocationFilter: DeliveryAreaLocationFilter,
        private deliveryAreaCompaniesFilter: DeliveryAreaCompaniesFilter,
        private deliveryAreaActiveFilter: DeliveryAreaActiveFilter,
    ) {}

    execute(filter?: DeliveryAreaFilterDTO): Promise<number> {
        const options: IRepositoryFiltersOptions<DeliveryArea, DeliveryAreaFilterDTO> = {
            filter,
            filterHelpers: [
                this.deliveryAreaLocationFilter,
                this.deliveryAreaCompaniesFilter,
                this.deliveryAreaActiveFilter,
            ],
        };
        return this.deliveryAreaRepository.getCount(options);
    }
}
