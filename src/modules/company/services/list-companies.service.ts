import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { PageInfo } from '../../common/types/page-info';
import { CompanyFilter } from '../types/company-filter';
import { PaginationHelper } from 'src/modules/common/helpers/pagination.helper';
import { SelectionHelper } from '../helpers/company-selection';
import { CompanyMapper } from '../helpers/company-mapper';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyFilterHelper } from '../helpers/company-filter-helper';

@Injectable()
export class ListCompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private companyMapper: CompanyMapper,
        private selectionHelper: SelectionHelper,
        private paginationHelper: PaginationHelper<Company>,

        private companyFilterHelper: CompanyFilterHelper,
    ) {}

    async execute(
        filter?: CompanyFilter,
        pagination?: PageInfo,
        userLocation?: GeoPoint,
    ): Promise<Company[]> {
        const query = this.companyRepository.createQueryBuilder('company');

        // apply selection
        this.selectionHelper.apply(query, userLocation);

        // apply filters
        this.companyFilterHelper.apply(query, filter);

        // apply pagination
        this.paginationHelper.apply(query, pagination);

        // get data from DB
        const { entities: companies, raw } = await query.getRawAndEntities();

        // map raw fields to entities
        this.companyMapper.apply(companies, raw);

        // get results
        return companies;
    }
}
