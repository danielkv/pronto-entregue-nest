import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../common/types/page-info';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { IDeliveryAreaRepository } from '../interfaces/delivery-area.repository.interface';
import { DeliveryAreaLocationFilter } from '../filters/delivery.area.location.filter';
import { DeliveryAreaCompaniesFilter } from '../filters/delivery.area.companies.filter';
import { DeliveryAreaActiveFilter } from '../filters/delivery.area.active.filter';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';

@Injectable()
export class ListDeliveryAreasService {
    constructor(
        @Inject('IDeliveryAreaRepository')
        private deliveryAreaRepository: IDeliveryAreaRepository,
        private deliveryAreaLocationFilter: DeliveryAreaLocationFilter,
        private deliveryAreaCompaniesFilter: DeliveryAreaCompaniesFilter,
        private deliveryAreaActiveFilter: DeliveryAreaActiveFilter,
    ) {}

    execute(filter: DeliveryAreaFilterDTO, pagination: PageInfo): Promise<DeliveryArea[]> {
        const options: IRepositoryListOptions<DeliveryArea, DeliveryAreaFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [
                this.deliveryAreaLocationFilter,
                this.deliveryAreaCompaniesFilter,
                this.deliveryAreaActiveFilter,
            ],
        };

        return this.deliveryAreaRepository.getList(options);
    }
}
