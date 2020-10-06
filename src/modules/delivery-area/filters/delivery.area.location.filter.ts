import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaLocationFilter implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilter>,
        filter?: DeliveryAreaFilter,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilter> {
        if (!filter?.location) return query;

        const { location } = filter;

        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        query.andWhere(
            'ST_Distance_Sphere(:userPoint, deliveryArea.center) <= deliveryArea.radius',
            { userPoint },
        );

        // return query
        return query;
    }
}
