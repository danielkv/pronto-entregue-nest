import { RepositoryBase } from '../../../common/repositories/repository.base';
import { GeoPoint } from '../../../common/types/geo-point';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { ICompanyRepositoryListOptions } from '../interfaces/company-options.repository.interface';
import { ICompanyFiltersOptions } from '../interfaces/company-filters-options.interface';

@EntityRepository(Company)
export class CompanyRepository extends RepositoryBase<Company, CompanyFilterDTO> implements ICompanyRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('company');
    }

    async getList(options: ICompanyRepositoryListOptions): Promise<Company[]> {
        const query = this.createQueryBuilder('company');

        // apply base selection
        this.applyBaseSelection(query);

        // apply user selection
        this.applyUserLocationSelection(query, options?.userLocation);

        // apply areas selection
        this.applyAreasSelection(query, options?.userLocation);

        // apply filters
        query.applyFilters(options.filterHelpers, options?.filter);

        // apply pagination
        query.applyPagination(options?.pagination);

        // get data from DB
        const { entities: companies, raw } = await query.getRawAndEntities();

        // map raw fields to entities
        this.mapProperties(companies, raw);

        // get results
        return companies;
    }

    async get(companyId: number, userLocation?: GeoPoint): Promise<Company>;
    async get(companyId: number[], userLocation?: GeoPoint): Promise<Company[]>;
    async get(companyId: any, userLocation?: GeoPoint): Promise<Company | Company[]> {
        const returnType = Array.isArray(companyId) ? 'array' : 'single';

        const query = this.createQueryBuilder('company');

        // apply base selection
        this.applyBaseSelection(query);

        // apply selection
        this.applyUserLocationSelection(query, userLocation);

        // apply areas selection
        this.applyAreasSelection(query, userLocation);

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.where('company.id IN (:...companyIds)', { companyIds });
        //query.limit(1);

        const { entities: companies, raw } = await query.getRawAndEntities();
        this.mapProperties(companies, raw);

        if (returnType === 'array') return companies;
        else return companies[0];
    }

    getCount(options: ICompanyFiltersOptions): Promise<number> {
        // create query
        const query = this.createQueryBuilder('company');

        // apply areas selection
        this.applyAreasSelection(query, options.userLocation);

        // apply filters
        query.applyFilters(options.filterHelpers, options.filter);

        // return count items
        return query.getCount();
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
        query.orderBy('isOpen OR (allowBuyClosed IS NOT NULL AND allowBuyClosed <> "false")', 'DESC');

        // return query
        return query;
    }

    applyUserLocationSelection(query: SelectQueryBuilder<Company>, location?: GeoPoint): SelectQueryBuilder<Company> {
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

    applyAreasSelection(query: SelectQueryBuilder<Company>, location: GeoPoint): SelectQueryBuilder<Company> {
        if (!location) return query;

        // define user point text
        const userPoint = `ST_GeomFromText('POINT(${location.coordinates[0]} ${location.coordinates[1]})')`;

        // join deliveryAreas
        query.leftJoinAndSelect(
            'company.deliveryAreas',
            'deliveryArea',
            `ST_Distance_Sphere(${userPoint}, deliveryArea.center) <= deliveryArea.radius AND deliveryArea.active`,
        );

        // join pickUpArea
        query.leftJoinAndSelect(
            'company.pickUpAreas',
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

export const CompanyRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyRepository',
    CompanyRepository,
).create();
