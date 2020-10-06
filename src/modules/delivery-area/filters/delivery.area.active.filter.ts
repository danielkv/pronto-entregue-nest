import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';

@Injectable()
export class DeliveryAreaActiveFilter implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: SelectQueryBuilder<DeliveryArea>,
        filter?: DeliveryAreaFilter,
    ): SelectQueryBuilder<DeliveryArea> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('deliveryArea.active');

        // return query
        return query;
    }
}
