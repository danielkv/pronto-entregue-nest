import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { DeliverySearchFilter } from '../filters/delivery.search.filter';
import { IDeliveryListOptions } from '../interfaces/delivery-list-options.interface';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';

@Injectable()
export class ListDeliveriesService {
    constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private deliverySearchFilter: DeliverySearchFilter,
    ) {}

    execute(filter?: DeliveryFilterDTO, pagination?: PageInfo): Promise<Delivery[]> {
        const options: IDeliveryListOptions = {
            pagination,
            filter,
            filterHelpers: [this.deliverySearchFilter],
            orderBy: { 'delivery.createdAt': 'DESC' },
        };

        return this.deliveryRepository.getList(options);
    }
}
