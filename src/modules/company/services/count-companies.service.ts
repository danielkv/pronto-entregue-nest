import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../types/company-filter';
import { CompanyFilterHelper } from '../helpers/company-filter-helper';

@Injectable()
export class CountCompaniesService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private companyFilterHelper: CompanyFilterHelper,
    ) {}

    execute(filter?: CompanyFilter): Promise<number> {
        // create query
        const query = this.companyRepository.createQueryBuilder('company');

        // apply filters
        this.companyFilterHelper.apply(query, filter);

        // return count items
        return query.getCount();
    }
}
