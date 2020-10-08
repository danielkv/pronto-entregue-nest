import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaActiveFilter implements IFilter<DeliveryArea, DeliveryAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO>,
        filter?: DeliveryAreaFilterDTO,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('DeliveryArea.active');

        console.log(query.getSql());
        // return query
        return query;
    }
}
