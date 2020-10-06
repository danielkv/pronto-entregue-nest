import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaActiveFilter implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilter>,
        filter?: DeliveryAreaFilter,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilter> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('deliveryArea.active');

        console.log(query.getSql());
        // return query
        return query;
    }
}
