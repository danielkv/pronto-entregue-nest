import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyDTO } from '../dtos/company.dto';
import { Company } from '../entities/company.entity';
import { CompanyLocationFilter } from '../filters/company.location.filter';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyQueryArgs } from '../types/company.query';

@QueryService(CompanyDTO)
export class CompanyService extends TypeOrmQueryService<Company> {
    constructor(private companyRepository: CompanyRepository, private companyLocationFilter: CompanyLocationFilter) {
        super(companyRepository);
    }

    async findByIdWithLocation(id: Company['id'], location?: GeoPoint): Promise<CompanyDTO> {
        const query = this.filterQueryBuilder.select({ filter: { id: { eq: id } } });

        this.companyRepository.applyBaseSelection(query);

        this.companyRepository.applyAreasSelection(query, location);

        this.companyRepository.applyUserLocationSelection(query, location);

        query.limit(1);

        const { entities: companies, raw } = await query.getRawAndEntities();

        return this.companyRepository.mapProperty(companies[0], raw[0]);
    }

    async findManyWithLocation(queryArgs: CompanyQueryArgs): Promise<CompanyDTO[]> {
        const helper = this.filterQueryBuilder;

        const query = helper.select(queryArgs);

        this.companyRepository.applyBaseSelection(query);

        this.companyRepository.applyAreasSelection(query, queryArgs.location);

        this.companyRepository.applyUserLocationSelection(query, queryArgs.location);

        this.companyRepository.applyFilters(query, [this.companyLocationFilter], queryArgs.extraFilter);

        const { entities: companies, raw } = await query.getRawAndEntities();

        return this.companyRepository.mapProperties(companies, raw);
    }

    countWithLocation(queryArgs: CompanyQueryArgs): Promise<number> {
        const helper = this.filterQueryBuilder;
        const query = helper.select(queryArgs);

        this.companyRepository.applyAreasSelection(query, queryArgs.location);

        this.companyRepository.applyUserLocationSelection(query, queryArgs.location);

        this.companyRepository.applyFilters(query, [this.companyLocationFilter], queryArgs.extraFilter);

        //if (queryArgs.filterLocation === true) this.companyRepository.applyLocationFilter(query);

        return query.getCount();
    }
}
