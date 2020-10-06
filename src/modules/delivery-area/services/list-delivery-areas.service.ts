import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationHelper } from '../../common/helpers/pagination.helper';
import { PageInfo } from '../../common/types/page-info';
import { Repository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterHelper } from '../helpers/delivery.area.filter.helper';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';

@Injectable()
export class ListDeliveryAreasService {
    constructor(
        @InjectRepository(DeliveryArea) private deliveryAreaRepository: Repository<DeliveryArea>,
        private deliveryAreaFilterHelper: DeliveryAreaFilterHelper,
        private paginationHelper: PaginationHelper<DeliveryArea>,
    ) {}

    async execute(filter: DeliveryAreaFilter, pagination: PageInfo): Promise<DeliveryArea[]> {
        // create query builder
        const query = this.deliveryAreaRepository.createQueryBuilder('deliveryArea');

        // apply filters
        this.deliveryAreaFilterHelper.apply(query, filter);

        // apply pagination
        this.paginationHelper.apply(query, pagination);

        // get rows
        const areas = await query.getMany();

        // return areas
        return areas;
    }
}
