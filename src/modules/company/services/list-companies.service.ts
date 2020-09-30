import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { PageInfo } from '../../common/types/page-info';
import { FilterHelper } from '../../common/helpers/filter.helper';
import { FilterSearch } from '../helpers/filter.search';
import { CompanyFilter } from '../types/company-filter';

@Injectable()
export class ListCompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private filterHelper: FilterHelper<Company, CompanyFilter>,
    ) {}

    async execute(filter?: CompanyFilter, pagination?: PageInfo): Promise<Company[]> {
        let query = this.companyRepository.createQueryBuilder('company');

        // pagination
        if (pagination) {
            const { skip, page, take } = pagination;

            if (!skip || page) query.skip(skip || page * take);

            if (take) query.take(take);
        }

        query = this.filterHelper.apply(query, filter, [new FilterSearch()]);

        return await query.getMany();
    }
}
