import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { PageInfo } from '../../common/types/page-info';
import { CompanyFilterDTO } from '../dtos/company.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class ListCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
    ) {}

    async execute(
        filter?: CompanyFilterDTO,
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
