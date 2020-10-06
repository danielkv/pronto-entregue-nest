import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageInfo } from '../../common/types/page-info';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { DeliveryAreaRepository } from '../repositories/delivery.area.repository';

@Injectable()
export class ListDeliveryAreasService {
    constructor(
        @InjectRepository(DeliveryAreaRepository)
        private deliveryAreaRepository: DeliveryAreaRepository,
    ) {}

    async execute(filter: DeliveryAreaFilter, pagination: PageInfo): Promise<DeliveryArea[]> {
        // create query builder
        const query = this.deliveryAreaRepository.createQueryBuilder('deliveryArea');

        // apply filters
        query.applyFilters(filter);

        // apply pagination
        query.applyPagination(pagination);

        // get rows
        const areas = await query.getMany();

        // return areas
        return areas;
    }
}
