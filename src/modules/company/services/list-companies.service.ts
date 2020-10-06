import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { PageInfo } from '../../common/types/page-info';
import { CompanyFilter } from '../dtos/company.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class ListCompaniesService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
    ) {}

    async execute(
        filter?: CompanyFilter,
        userLocation?: GeoPoint,
        pagination?: PageInfo,
    ): Promise<Company[]> {
        const query = this.companyRepository.createQueryBuilder('company');

        // apply base selection
        this.companyRepository.applyBaseSelection(query);

        // apply user selection
        this.companyRepository.applyUserLocationSelection(query, userLocation);

        // apply areas selection
        this.companyRepository.applyAreasSelection(query, userLocation);

        // apply filters
        query.applyFilters(filter);

        // apply pagination
        query.applyPagination(pagination);

        // get data from DB
        const { entities: companies, raw } = await query.getRawAndEntities();

        // map raw fields to entities
        this.companyRepository.mapProperties(companies, raw);

        // get results
        return companies;
    }
}
