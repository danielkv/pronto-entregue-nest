import { RepositoryBase } from '../../../common/repositories/repository.base';
import { GeoPoint } from '../../../common/types/geo-point';
import { Brackets, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { CompanyExtraFilterDTO } from '../dtos/company.extra-filter.dto';
import { Company } from '../entities/company.entity';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { ObjectLike } from 'src/modules/common/interfaces/object.interface';

@EntityRepository(Company)
export class CompanyRepository extends RepositoryBase<Company, CompanyExtraFilterDTO> {
    applyBaseSelection(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company> {
        // join businessHours
        query.leftJoin('Company.metas', 'meta', "meta.key = 'businessHours'");

        // query selection
        query.addSelect([
            'COMPANY_IS_OPEN(`meta`.`value`) as isOpen',
            'COMPANY_NEXT_OPEN_DATE(`meta`.`value`, NOW()) as nextOpen',
            'COMPANY_NEXT_CLOSE_DATE(`meta`.`value`) as nextClose',
            'COMPANY_ALLOW_BUY_CLOSED_BY_ID(`Company`.`id`) as allowBuyClosed',
        ]);

        // order by (open | allowBuyClosed)
        query.addOrderBy('isOpen OR (allowBuyClosed IS NOT NULL AND allowBuyClosed <> "false")', 'DESC');

        // return query
        return query;
    }

    applyLocationFilter(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company> {
        // checks if tables deliveryArea and viewArea were included
        const sql = query.getSql();
        if (!sql.includes('deliveryArea') || !sql.includes('pickUpArea'))
            throw new Error('Não foi possível encontrar a localização do usuário');

        // apply filter
        query.andWhere(
            new Brackets(qb =>
                qb
                    // filter deliveryAreas
                    .where('deliveryArea.id IS NOT NULL')
                    // OR filter viewAreas
                    .orWhere('pickUpArea.id IS NOT NULL'),
            ),
        );

        // return query
        return query;
    }

    applyUserLocationSelection(query: SelectQueryBuilder<Company>, location?: GeoPoint): SelectQueryBuilder<Company> {
        if (!location) return query;

        // join address
        query.leftJoinAndSelect('Company.address', 'companyAddress');

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // add select distance (user address to company address)
        query.addSelect(`ST_Distance_Sphere(${userPoint}, companyAddress.location) as distance`);

        // add distance order
        query.addOrderBy('distance', 'ASC');

        // return query
        return query;
    }

    applyAreasSelection(query: SelectQueryBuilder<Company>, location: GeoPoint): SelectQueryBuilder<Company> {
        if (!location) return query;

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // join deliveryAreas
        query.leftJoinAndSelect(
            'Company.deliveryAreas',
            'deliveryArea',
            `ST_Distance_Sphere(${userPoint}, deliveryArea.center) <= deliveryArea.radius AND deliveryArea.active`,
        );

        // join pickUpArea
        query.leftJoinAndSelect(
            'Company.pickUpAreas',
            'pickUpArea',
            `ST_Distance_Sphere(${userPoint}, pickUpArea.center) <= pickUpArea.radius AND pickUpArea.active`,
        );

        return query;
    }

    /**
     * Map properties to model
     * @param companies Entity result from query
     * @param raw Raw result from query
     */
    mapProperties(companies: Company[], raw: any[]): Company[] {
        return companies.map((company, index) => this.mapProperty(company, raw[index]));
    }

    mapProperty(company: Company, raw: ObjectLike): Company {
        return {
            ...company,
            isOpen: raw.isOpen,
            nextClose: raw.nextClose,
            nextOpen: raw.nextOpen,
            allowBuyClosed: raw.allowBuyClosed,
            distance: raw.distance,
        };
    }
}

export const CompanyRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyRepository',
    CompanyRepository,
).create();
