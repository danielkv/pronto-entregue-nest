import { Injectable } from '@nestjs/common';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class SelectAreas {
    apply(query: SelectQueryBuilder<Company>, location: GeoPoint): SelectQueryBuilder<Company> {
        if (!location) return query;

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // join deliveryAreas
        query.leftJoinAndSelect(
            'company.deliveryAreas',
            'deliveryArea',
            `ST_Distance_Sphere(${userPoint}, deliveryArea.center) <= deliveryArea.radius`,
        );

        // join viewAreas
        query.leftJoinAndSelect(
            'company.viewAreas',
            'viewArea',
            `ST_Distance_Sphere(${userPoint}, viewArea.center) <= viewArea.radius`,
        );

        return query;
    }
}
