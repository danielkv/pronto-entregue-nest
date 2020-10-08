import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilterDTO } from '../dtos/company.filter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';

@Injectable()
export class CompanySearchFilter implements IFilter<Company, CompanyFilterDTO> {
    apply(
        query: QueryBuilderBase<Company, CompanyFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<Company, CompanyFilterDTO> {
        if (!filter?.search) return query;

        return query.andWhere(
            new Brackets(qb =>
                qb
                    .where('company.name LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('company.displayName LIKE :search', {
                        search: `%${filter.search}%`,
                    }),
            ),
        );
    }
}
