import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterHelper } from '../../common/helpers/filter.helper';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { FilterSearch } from '../helpers/filter.search';
import { CompanyFilter } from '../types/company-filter';

@Injectable()
export class CountCompaniesService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private filterHelper: FilterHelper<Company, CompanyFilter>,
    ) {}

    execute(filter?: CompanyFilter): Promise<number> {
        // create query
        const query = this.companyRepository.createQueryBuilder('company');

        // apply filters
        this.filterHelper.apply(query, filter, [new FilterSearch()]);

        // return count items
        return query.getCount();
    }
}
