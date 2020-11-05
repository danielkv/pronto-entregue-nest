import { Inject, Injectable } from '@nestjs/common';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { DeliverySearchFilter } from '../filters/delivery.search.filter';
import { IDeliveryFilterOptions } from '../interfaces/delivery-filter-options.interface';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';

@Injectable()
export class CountDeliveriesService {
    constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private deliverySearchFilter: DeliverySearchFilter,
    ) {}

    execute(filter?: DeliveryFilterDTO): Promise<number> {
        const options: IDeliveryFilterOptions = {
            filter,
            filterHelpers: [this.deliverySearchFilter],
        };

        return this.deliveryRepository.getCount(options);
    }
}
