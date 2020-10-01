import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyFilter } from '../types/company-filter';
import * as _ from 'lodash';
import { Company } from '../entities/company.entity';

@Injectable()
export class FilterLocation implements IFilter<Company, CompanyFilter> {
    apply(query: SelectQueryBuilder<Company>, filter?: CompanyFilter): SelectQueryBuilder<Company> {
        if (!filter?.location || _.isEmpty(filter)) return query;

        const { location } = filter;

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // join deliveryAreas
        query.leftJoin(
            'company.deliveryAreas',
            'deliveryArea',
            `ST_Distance_Sphere(${userPoint}, deliveryArea.center) <= deliveryArea.radius`,
        );

        // join viewAreas
        query.leftJoin(
            'company.viewAreas',
            'viewArea',
            `ST_Distance_Sphere(${userPoint}, viewArea.center) <= viewArea.radius`,
        );

        // filter deliveryAreas
        query.andWhere('deliveryArea.id IS NOT NULL');

        // filter viewAreas
        query.andWhere('viewArea.id IS NOT NULL');

        // return query
        return query;
    }
}
