import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { CategoryFilterDTO } from '../dtos/category.filter.dto';
import { Category } from '../entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryCompanyFilter implements IFilter<Category, CategoryFilterDTO> {
    async apply(
        query: QueryBuilderBase<Category, CategoryFilterDTO>,
        filter: CategoryFilterDTO,
    ): Promise<QueryBuilderBase<Category, CategoryFilterDTO>> {
        if (!filter?.companyId) return query;

        // check filter type
        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        // apply filter
        query.andWhere('category.companyId IN (:...companyIds)', { companyIds });

        //return filter
        return query;
    }
}
