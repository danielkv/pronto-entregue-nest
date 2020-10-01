import { Injectable } from '@nestjs/common';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class SelectUserLocation {
    apply(query: SelectQueryBuilder<Company>, location?: GeoPoint): SelectQueryBuilder<Company> {
        if (!location) return query;

        // join address
        query.leftJoinAndSelect('company.address', 'address');

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // add select distance (user address to company address)
        query.addSelect(`ST_Distance_Sphere(${userPoint}, address.location) as distance`);

        // add distance order
        query.addOrderBy('distance', 'ASC');

        // return query
        return query;
    }
}
