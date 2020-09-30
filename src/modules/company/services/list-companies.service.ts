import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { PageInfo } from '../../common/types/page-info';
import { FilterHelper } from '../../common/helpers/filter.helper';
import { FilterSearch } from '../helpers/filter.search';
import { CompanyFilter } from '../types/company-filter';
import { PaginationHelper } from 'src/modules/common/helpers/pagination.helper';

@Injectable()
export class ListCompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private filterHelper: FilterHelper<Company, CompanyFilter>,
        private paginationHelper: PaginationHelper<Company>,
    ) {}

    async execute(filter?: CompanyFilter, pagination?: PageInfo): Promise<Company[]> {
        const query = this.companyRepository.createQueryBuilder('company');

        // query.select();

        // apply pagination
        this.paginationHelper.apply(query, pagination);

        //apply filters
        this.filterHelper.apply(query, filter, [new FilterSearch()]);

        // get results
        return await query.getMany();
    }
}
