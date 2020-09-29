import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { PageInfo } from '../graphql/types/page-info';
import { FilterHelper } from './helpers/filter.helper';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private filterHelper: FilterHelper,
    ) {}

    async getCompanies(filter?: any, pagination?: PageInfo): Promise<Company[]> {
        let query = this.companyRepository.createQueryBuilder('company');

        // pagination
        if (pagination) {
            const { skip, page, take } = pagination;

            if (!skip || page) query.skip(skip || page * take);

            if (take) query.take(take);
        }

        query = this.filterHelper.apply(query, filter);

        // apply filters
        if (filter?.search) {
            query
                .where('company.name LIKE :search', {
                    search: `%${filter.search}%`,
                })
                .orWhere('company.displayName LIKE :search', {
                    search: `%${filter.search}%`,
                });
        }

        return await query.getMany();
    }

    countCompanies(filter?: any): Promise<number> {
        let query = this.companyRepository.createQueryBuilder('company');

        query = this.filterHelper.apply(query, filter);

        return query.getCount();
    }
}
