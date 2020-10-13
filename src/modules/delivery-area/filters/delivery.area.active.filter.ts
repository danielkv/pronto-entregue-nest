import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaActiveFilter implements IFilter<DeliveryArea, DeliveryAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO>,
        filter?: DeliveryAreaFilterDTO,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('deliveryArea.active');

        // return query
        return query;
    }
}
