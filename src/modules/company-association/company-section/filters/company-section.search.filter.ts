import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';

@Injectable()
export class CompanySectionSearchFilter implements IFilter<CompanySection, CompanySectionFilterDTO> {
    apply(
        query: QueryBuilderBase<CompanySection, CompanySectionFilterDTO>,
        filter?: any,
    ): QueryBuilderBase<CompanySection, CompanySectionFilterDTO> {
        if (!filter?.search) return query;

        return query
            .andWhere(
                new Brackets(qb =>
                    qb.where('companySection.name LIKE :search').orWhere('companySection.description LIKE :search'),
                ),
            )
            .setParameters({
                search: `%${filter.search}%`,
            });
    }
}
