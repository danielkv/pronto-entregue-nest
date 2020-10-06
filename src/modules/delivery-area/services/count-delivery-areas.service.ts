import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { DeliveryAreaRepository } from '../repositories/delivery.area.repository';

@Injectable()
export class CountDeliveryAreasService {
    constructor(
        @InjectRepository(DeliveryAreaRepository)
        private deliveryAreaRepository: DeliveryAreaRepository,
    ) {}

    execute(filter?: DeliveryAreaFilter): Promise<number> {
        // create query builder
        const query = this.deliveryAreaRepository.createQueryBuilder('deliveryArea');

        // apply filters
        this.deliveryAreaRepository.applyFilters(query, filter);

        // get rows
        return query.getCount();
    }
}
