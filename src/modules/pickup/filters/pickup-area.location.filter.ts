import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { PickUpArea } from '../entities/pickup-area.entity';

@Injectable()
export class PickUpAreaLocationFilter implements IFilter<PickUpArea, PickUpAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO>,
        filter?: PickUpAreaFilterDTO,
    ): QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO> {
        if (!filter?.location) return query;

        const { location } = filter;

        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        query.andWhere('ST_Distance_Sphere(:userPoint, deliveryArea.center) <= PickUpArea.radius', {
            userPoint,
        });

        // return query
        return query;
    }
}
