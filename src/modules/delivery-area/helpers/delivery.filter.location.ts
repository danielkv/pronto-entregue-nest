import * as _ from 'lodash';

import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';

@Injectable()
export class DeliveryAreaFilterLocation implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: SelectQueryBuilder<DeliveryArea>,
        filter?: DeliveryAreaFilter,
    ): SelectQueryBuilder<DeliveryArea> {
        if (_.isEmpty(filter) || !filter?.location) return query;

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
