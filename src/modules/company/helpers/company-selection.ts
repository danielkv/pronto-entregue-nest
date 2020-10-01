import { Injectable } from '@nestjs/common';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class SelectionHelper {
    apply(
        query: SelectQueryBuilder<Company>,
        userLocation?: GeoPoint,
    ): SelectQueryBuilder<Company> {
        // join businessHours
        query.leftJoin('company.metas', 'meta', "meta.key = 'businessHours'");

        // query selection
        query.addSelect([
            'COMPANY_IS_OPEN(`meta`.`value`) as isOpen',
            'COMPANY_NEXT_OPEN_DATE(`meta`.`value`, NOW()) as nextOpen',
            'COMPANY_NEXT_CLOSE_DATE(`meta`.`value`) as nextClose',
            'COMPANY_ALLOW_BUY_CLOSED_BY_ID(`company`.`id`) as allowBuyClosed',
        ]);

        // order by (open | allowBuyClosed)
        query.orderBy(
            'isOpen OR (allowBuyClosed IS NOT NULL AND allowBuyClosed <> "false")',
            'DESC',
        );

        // join company address
        query.leftJoin('company.address', 'address');

        if (userLocation) {
            // define user point text
            const userPoint = `ST_GeomFromText('POINT(${userLocation.coordinates[0]} ${userLocation.coordinates[1]})')`;

            // add select distance (user address to company address)
            query.addSelect(`ST_Distance_Sphere(${userPoint}, address.location) as distance`);
        }

        // return query
        return query;
    }
}
