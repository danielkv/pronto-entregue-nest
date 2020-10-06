import { RepositoryBase } from '../../common/repositories/repository.base';
import { GeoPoint } from '../../common/types/geo-point';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { CompanyFilter } from '../dtos/company.filter';
import { Company } from '../entities/company.entity';
import { CompanyActiveFilter } from '../filters/company.active.filter';
import { CompanyLocationFilter } from '../filters/company.location.filter';
import { CompanyPublishedFilter } from '../filters/company.published.filter';
import { CompanySearchFilter } from '../filters/company.search.filter';

@EntityRepository(Company)
export class CompanyRepository extends RepositoryBase<Company, CompanyFilter> {
    constructor() {
        super();

        this.setFilters([
            new CompanyLocationFilter(),
            new CompanySearchFilter(),
            new CompanyPublishedFilter(),
            new CompanyActiveFilter(),
        ]);
    }

    applyBaseSelection(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company> {
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

        // return query
        return query;
    }

    applyUserLocationSelection(
        query: SelectQueryBuilder<Company>,
        location?: GeoPoint,
    ): SelectQueryBuilder<Company> {
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

    applyAreasSelection(
        query: SelectQueryBuilder<Company>,
        location: GeoPoint,
    ): SelectQueryBuilder<Company> {
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

    /**
     * Map properties to model
     * @param companies Entity result from query
     * @param raw Raw result from query
     */
    mapProperties(companies: Company[], raw: any[]): Company[] {
        companies.forEach((company, index) => {
            company.isOpen = raw[index].isOpen;
            company.nextClose = raw[index].nextClose;
            company.nextOpen = raw[index].nextOpen;
            company.allowBuyClosed = raw[index].allowBuyClosed;
            company.distance = raw[index].distance;
        });

        return companies;
    }
}
