import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterHelper } from '../helpers/delivery.area.filter.helper';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';

@Injectable()
export class CountDeliveryAreasService {
    constructor(
        @InjectRepository(DeliveryArea) private deliveryAreaRepository: Repository<DeliveryArea>,
        private deliveryAreaFilterHelper: DeliveryAreaFilterHelper,
    ) {}

    execute(filter: DeliveryAreaFilter): Promise<number> {
        // create query builder
        const query = this.deliveryAreaRepository.createQueryBuilder('deliveryArea');

        // apply filters
        this.deliveryAreaFilterHelper.apply(query, filter);

        // get rows
        return query.getCount();
    }
}
