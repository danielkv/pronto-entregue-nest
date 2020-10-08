import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaLocationFilter implements IFilter<DeliveryArea, DeliveryAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO>,
        filter?: DeliveryAreaFilterDTO,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO> {
        if (!filter?.location) return query;

        const { location } = filter;

        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        query.andWhere(
            'ST_Distance_Sphere(:userPoint, deliveryArea.center) <= DeliveryArea.radius',
            { userPoint },
        );

        // return query
        return query;
    }
}
